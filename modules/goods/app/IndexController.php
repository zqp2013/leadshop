<?php
/**
 * @link https://www.leadshop.vip/
 * @copyright Copyright ©2020-2021 浙江禾成云计算有限公司
 */

namespace goods\app;

use app\forms\video\Video;
use framework\common\BasicController;
use goods\models\Goods;
use Yii;
use yii\data\ActiveDataProvider;
use framework\wechat\Lib\Tools;

/**
 * 小程序商品
 */
class IndexController extends BasicController
{

    /**
     * 重写父类
     * @return [type] [description]
     */
    public function actions()
    {
        $actions = parent::actions();
        unset($actions['create']);
        unset($actions['update']);
        return $actions;
    }

    public function actionIndex()
    {
        //获取操作
        $behavior = Yii::$app->request->get('behavior', '');
        switch ($behavior) {
            case 'recommend':
                return $this->recommend();
                break;
            case 'fitment':
                return $this->fitment();
                break;
            case 'goods_order':
                return $this->goods_order();
                break;
            default:
                Error('未定义方法');
                break;
        }
    }

    /**
     * 商品详情页订单滚动
     */
    public function goods_order()
    {
        $goods_id = Yii::$app->request->get('goods_id', false);
        $AppID    = Yii::$app->params['AppID'];
        $list     = M('order', 'Order')::find()
            ->alias('order')
            ->joinWith([
                'user as user',
                'goods as goods',
            ])
            ->where(['and', ['>', 'order.status', 200], ['order.is_recycle' => 0, 'order.AppID' => $AppID, 'goods.goods_id' => $goods_id]])
            ->select('order.id,order.UID,order.order_sn,order.pay_time,order.created_time')
            ->orderBy(['order.created_time' => SORT_DESC])
            ->limit(20)
            ->asArray()
            ->all();

        $return_data = [];
        foreach ($list as $v) {
            $info = $v['user'];
            array_push($return_data, ['nickname' => $info['nickname'], 'avatar' => $info['avatar'], 'time' => $v['pay_time']]);
        }

        return $return_data;

    }

    public function actionDelete()
    {
        return '占位方法';
    }

    /**
     * 装修组件商品列表
     */
    public function fitment()
    {
        $goods_id = Yii::$app->request->get('goods_id', '');
        $auto     = Yii::$app->request->get('auto', 0);
        $is_task  = Yii::$app->request->get('is_task', false);
        $goods_id = explode(',', $goods_id);
        $AppID    = Yii::$app->params['AppID'];

        //判断是否安装
        $task_status = $this->plugins("task", "status");
        if ($is_task && !$task_status) {
            Error("任务中心插件未安装");
        }
        //用于判断插件是否安装
        if ($is_task && $task_status) {
            if ($auto) {
                $data = Goods::find()
                    ->from(['g' => Goods::tableName()])
                    ->joinWith('task as t')
                    ->where([
                        "t.goods_is_sale" => 1,
                        "t.is_recycle"    => 0,
                        "t.is_deleted"    => 0,
                    ])
                    ->limit($auto)
                    ->asArray()
                    ->all();
                foreach ($data as $key => &$value) {
                    $value['slideshow'] = to_array($value['slideshow']);
                }
                //将所有返回内容中的本地地址代替字符串替换为域名
                $data = str2url($data);
                return $data;
            } else {
                $where = ['AppID' => $AppID];
                $where = ['and', $where, ['g.id' => $goods_id]];
                $where = ['and', $where, ['t.goods_is_sale' => 1, "t.is_recycle" => 0, "t.is_deleted" => 0]];
                $data  = Goods::find()
                    ->from(['g' => Goods::tableName()])
                    ->where($where)
                    ->orderBy(['g.created_time' => SORT_DESC])
                    ->joinWith('task as t')
                    ->asArray()
                    ->all();
            }

        } else {
            $where = ['id' => $goods_id, 'AppID' => $AppID, 'is_sale' => 1, 'is_recycle' => 0, 'is_deleted' => 0];
            $data  = Goods::find()
                ->where($where)
                ->orderBy(['created_time' => SORT_DESC])
                ->asArray()
                ->all();
        }

        foreach ($data as $key => &$value) {
            $value['slideshow'] = to_array($value['slideshow']);
        }
        //将所有返回内容中的本地地址代替字符串替换为域名
        $data = str2url($data);

        $data = array_column($data, null, 'id');
        $list = [];
        foreach ($goods_id as $id) {
            if (isset($data[$id])) {
                array_push($list, $data[$id]);
            }
        }
        return $list;
    }

    /**
     * 推广商品
     */
    public function recommend()
    {
        $AppID = Yii::$app->params['AppID'];
        $where = ['AppID' => $AppID];
        //判断是否安装
        $task_status = $this->plugins("task", "status");
        //商品分组
        $is_task = Yii::$app->request->get('is_task', false);

        $goods_setting = StoreSetting('setting_collection', 'goods_setting');

        $goods_id = false;
        if ($goods_setting && !$is_task) {
            if ($goods_setting['recommend_status'] === 2) {
                $goods    = $goods_setting['recommend_goods'];
                $goods_id = array_column($goods, 'id');
                $where    = ['and', $where, ['g.id' => $goods_id]];

            }
        }

        //用于判断插件是否安装
        if ($is_task && $task_status) {
            $where = ['and', $where, ['t.goods_is_sale' => 1]];
            $where = ['and', $where, ['t.is_recycle' => 0]];

            $data = Goods::find()
                ->joinWith('task')
                ->from(['g' => Goods::tableName()])
                ->where($where)
                ->orderBy(['sales' => SORT_DESC])
                ->offset(0)
                ->limit(6)
                ->asArray()
                ->all();
        } else {
            $where = ['and', $where, ['is_recycle' => 0, 'is_sale' => 1]];
            $data  = Goods::find()
                ->from(['g' => Goods::tableName()])
                ->where($where)
                ->orderBy(['sales' => SORT_DESC])
                ->offset(0)
                ->limit(20)
                ->asArray()
                ->all();
        }

        foreach ($data as $key => &$value) {
            $value['slideshow'] = to_array($value['slideshow']);
        }
        //将所有返回内容中的本地地址代替字符串替换为域名
        $data = str2url($data);
        if ($goods_id) {
            $data = array_column($data, null, 'id');
            $list = [];
            foreach ($goods_id as $id) {
                if (isset($data[$id])) {
                    array_push($list, $data[$id]);
                }
            }

            return $list;
        }
        return $data;
    }

    /**
     * 商品列表
     * @return [type] [description]
     */
    public function actionSearch()
    {
        //获取头部信息
        $headers = Yii::$app->getRequest()->getHeaders();
        //获取分页信息
        $pageSize = $headers->get('X-Pagination-Per-Page') ?? 20;
        //商品分组
        $keyword = Yii::$app->request->post('keyword', []);

        //判断是否为积分商品
        $is_task = Yii::$app->request->get('is_task', 0);

        $AppID = Yii::$app->params['AppID'];
        $where = ['AppID' => $AppID];

        //商品分类筛选
        $group = $keyword['group'] ?? false;
        if ($group > 0) {
            $where = ['and', $where, ['like', 'group', '-' . $group . '-']];
        }

        //商品id筛选
        $goods_id = $keyword['goods_id'] ?? false;
        if (!empty($goods_id)) {
            $where = ['and', $where, ['id' => $goods_id]];
        }

        //价格区间
        $price_start = $keyword['price_start'] ?? false;
        if ($price_start > 0) {
            $where = ['and', $where, ['>=', 'price', $price_start]];
        }
        $price_end = $keyword['price_end'] ?? false;
        if ($price_end > 0) {
            $where = ['and', $where, ['<=', 'price', $price_end]];
        }

        //搜索
        $search = $keyword['search'] ?? '';
        if ($search) {
            $where = ['and', $where, ['like', 'name', $search]];
        }

        $coupon_id = $keyword['coupon_id'] ?? false;
        if ($coupon_id) {
            $c_info = M('coupon', 'Coupon')::findOne($coupon_id);
            if ($c_info) {
                $appoint_data = explode('-', trim($c_info->appoint_data, '-'));
                switch ((int) $c_info->appoint_type) {
                    case 2:
                        $where = ['and', $where, ['id' => $appoint_data]];
                        break;
                    case 3:
                        $g_like = ['or'];
                        foreach ($appoint_data as $group_id) {
                            array_push($g_like, ['like', 'group', '-' . $group_id . '-']);
                        }
                        $where = ['and', $where, $g_like];
                        break;
                    case 4:
                        $where = ['and', $where, ['not in', 'id', $appoint_data]];
                        break;
                    case 5:
                        $g_not_like = ['and'];
                        foreach ($appoint_data as $group_id) {
                            array_push($g_not_like, ['not like', 'group', '-' . $group_id . '-']);
                        }
                        $where = ['and', $where, $g_not_like];
                        break;
                }
            } else {
                Error('优惠券不存在');
            }
        }

        //处理排序
        $sort    = isset($keyword['sort']) && is_array($keyword['sort']) ? $keyword['sort'] : [];
        $orderBy = [];
        if (empty($sort)) {
            $orderBy = ['created_time' => SORT_DESC];
        } else {
            foreach ($sort as $key => $value) {
                if (!sql_check($key)) {
                    $orderBy[$key] = $value === 'ASC' ? SORT_ASC : SORT_DESC;
                }
            }
        }
        //判断是否安装
        $task_status = $this->plugins("task", "status");
        //用于判断插件是否安装
        if ($is_task && $task_status) {
            $where = ['and', $where, ['t.goods_is_sale' => 1]];
            $where = ['and', $where, ['t.is_recycle' => 0]];
            $data  = new ActiveDataProvider(
                [
                    'query'      => Goods::find()
                        ->joinWith('task')
                        ->from(['g' => Goods::tableName()])
                        ->where($where)
                        ->orderBy($orderBy)
                        ->asArray(),
                    'pagination' => ['pageSize' => $pageSize, 'validatePage' => false],
                ]
            );
        } else {
            $where = ['and', $where, ['is_recycle' => 0, 'is_sale' => 1]];
            $data  = new ActiveDataProvider(
                [
                    'query'      => Goods::find()
                        ->where($where)
                        ->orderBy($orderBy)
                        ->asArray(),
                    'pagination' => ['pageSize' => $pageSize, 'validatePage' => false],
                ]
            );
        }

        $list = $data->getModels();
        foreach ($list as $key => &$value) {
            $value['slideshow'] = to_array($value['slideshow']);
        }
        //将所有返回内容中的本地地址代替字符串替换为域名
        $list = str2url($list);
        $data->setModels($list);
        return $data;
    }

    /**
     * 单个商品详情
     * @return [type] [description]
     */
    public function actionView()
    {
        $id      = Yii::$app->request->get('id', false);
        $is_task = Yii::$app->request->get('is_task', false);
        $address = Yii::$app->request->get('address', []);
        $type    = Yii::$app->request->get('type', false);
        $UID     = Yii::$app->user->identity->id ?? null;

        //判断是否安装
        $task_status = $this->plugins("task", "status");

        if ($type == 'param') {
            $with = ['param'];
        } else {
            $with = ['param', 'body', 'package', 'freight'];
        }

        if ($is_task && $task_status) {
            $taskModel = 'plugins\task\models\TaskGoods';
            $result    = $taskModel::find()->where(["goods_id" => $id])->asArray()->one();
            if (empty($result) || $result['is_deleted'] === 1) {
                return ['empty_status' => 1];
            } elseif ($result['goods_is_sale'] === 0) {
                return ['empty_status' => 2];
            }
            $result = Goods::find()->where(['id' => $id])->with($with)->asArray()->one();
        } else {
            $result = Goods::find()->where(['id' => $id])->with($with)->asArray()->one();
            if (empty($result) || $result['is_deleted'] === 1) {
                return ['empty_status' => 1];
            } elseif ($result['is_sale'] === 0) {
                return ['empty_status' => 2];
            }
        }

        $result['param']['param_data']   = to_array($result['param']['param_data']);
        $result['param']['image_status'] = $result['param']['param_data'][0]['image_status'];
        $result['slideshow']             = to_array($result['slideshow']);

        if ($type == 'param') {
            $return_param = [
                'id'               => $result['id'],
                'stocks'           => $result['stocks'],
                'slideshow'        => $result['slideshow'],
                'unit'             => $result['unit'],
                'price'            => $result['price'],
                'param'            => $result['param'],
                'limit_buy_status' => $result['limit_buy_status'],
                'limit_buy_value'  => $result['limit_buy_value'],
                'min_number'       => $result['min_number'],
            ];
            return str2url($return_param);
        }

        $result['video'] = to_array($result['video']);
        if ($result['is_video'] === 1 && is_array($result['video'])) {
            if (isset($result['video']['type']) && $result['video']['type'] === 2) {
                $result['video']['url'] = Video::getUrl($result['video']['url']);
            }
        }
        //浏览记录
        $this->module->event->visit_goods_info = ['goods_id' => $result['id'], 'AppID' => $result['AppID'], 'merchant_id' => $result['merchant_id'], 'UID' => $UID];
        $this->module->trigger('visit_goods');

        //处理运费
        $result['freight']['freight_rules'] = $result['freight'] ? to_array($result['freight']['freight_rules']) : null;
        $result['package']['free_area']     = $result['package'] ? to_array($result['package']['free_area']) : null;
        $freight                            = 0;
        if (isset($address['province']) && isset($address['city']) && isset($address['district'])) {

            if ($result['ft_type'] === 1) {
                //固定邮费
                $freight = $result['ft_price'];
            } else {
                //运费模板
                foreach ($result['freight']['freight_rules'] as $freight_rules) {
                    $province = array_column($freight_rules['area'], null, 'name');
                    if (array_key_exists($address['province'], $province)) {
                        $city = $province[$address['province']]['list'];
                        $city = array_column($city, null, 'name');
                        if (array_key_exists($address['city'], $city)) {
                            $district = $city[$address['city']]['list'];
                            $district = array_column($district, null, 'name');
                            if (array_key_exists($address['district'], $district)) {
                                $freight += $freight_rules['first']['price']; //首件首重费用
                            }
                        }
                    }
                }

            }
        }
        $result['freight_price'] = $freight;
        unset($result['freight']);

        //处理包邮规则展示
        if ($result['pfr_status'] && is_array($result['package']['free_area'])) {
            foreach ($result['package']['free_area'] as $key => &$value) {
                $value['area'] = implode('、', array_column($value['area'], 'name'));
            }
        }
        $services                     = to_array($result['services']);
        $result['services']           = M('goods', 'GoodsService')::find()->where(['id' => $services, 'status' => 1])->select('title,content')->orderBy(['sort' => SORT_DESC])->asArray()->all();
        $result['body']['goods_args'] = to_array($result['body']['goods_args']);
        $result['body']['content']    = htmlspecialchars_decode($result['body']['content']);
        //将所有返回内容中的本地地址代替字符串替换为域名
        $result         = str2url($result);
        $result['task'] = [];

        //用于判断插件是否安装
        if ($is_task && $task_status) {
            $taskModel      = 'plugins\task\models\TaskGoods';
            $task           = $taskModel::find()->where(["goods_id" => $result['id']])->asArray()->one();
            $result['task'] = $task;
        }

        $result['commission'] = 0;
        $promoter_status      = StoreSetting('promoter_setting', 'status');
        if ($promoter_status) {
            $promoter_model = M('promoter', 'Promoter')::findOne(['UID' => $UID]);
            if ($promoter_model && $promoter_model->status == 2) {
                $count_rules          = StoreSetting('commission_setting', 'count_rules');
                $commission_key       = $count_rules == 1 ? 'max_price' : 'max_profits';
                $scale                = $promoter_model->levelInfo->first / 100;
                $result['commission'] = qm_round($result[$commission_key] * $scale, 2, 'floor');
            } else {
                $result['is_promoter'] = 0;
            }
        } else {
            $result['is_promoter'] = 0;
        }
        Goods::updateAllCounters(['visits' => 1], ['id' => $id]);

        return $result;
    }

    public static function addSales($event)
    {
        //add by qpzhou
        $has_tech_support = 'p';
        $period = 0;
        $total_amount = 0;
        $buyer = M('order', 'OrderBuyer')::find()->where(['order_sn' => $event->pay_order_sn])->one();
        $phone = $buyer['mobile'];

        $list = M('order', 'OrderGoods')::find()->where(['order_sn' => $event->pay_order_sn])->with('goods')->select('order_sn,goods_id,goods_number,pay_amount,goods_param')->asArray()->all();
        foreach ($list as $value) {
            Goods::updateAllCounters(['sales_amount' => $value['pay_amount'], 'sales' => $value['goods_number']], ['id' => $value['goods_id']]);
            if ($value['goods']['is_promoter'] === 1) {
                M('promoter', 'PromoterGoods')::updateAllCounters(['sales' => $value['goods_number']], ['goods_id' => $value['goods_id']]);
            }

            //add by qpzhou
            if ($value['goods_id'] === 2) { //VIP产品
                $month = 1;
                if (strpos($value['goods_param'], '月卡') === 0) {
                    $month = 1;
                } elseif (strpos($value['goods_param'], '季卡') === 0) {
                    $month = 3;
                } elseif (strpos($value['goods_param'], '半年卡') === 0) {
                    $month = 6;
                } elseif (strpos($value['goods_param'], '年卡') === 0) {
                    $month = 12;
                }

                if (strpos($value['goods_param'], '无技术支持') !== false) {
                    $has_tech_support = 'q';
                }
                
                $period += ($month * $value['goods_number']);
                $total_amount += $value['pay_amount'];
            }
        }


        //add by qpzhou:支付成功后，调用api开通会员
        //https://www.fun123.cn/pay/api?toke=ZqPKTn&orderId=vxq1osn1288888&phone=18721201607&period=1&amount=8
        $uri = 'https://www.fun123.cn/pay/api?toke=ZqPKTn&orderId=vx' .  $has_tech_support . $period . $event->pay_order_sn .
            '&phone=' . $phone . '&period=' . $period . '&amount=' . $total_amount;
        $res = Tools::httpGet($uri);

        $fp = fopen("/var/www/leadshop/modules/goods/app/log.txt", "a");
        fwrite($fp, "uri:" . $uri);
        fwrite($fp, "res:" . $res);
        fclose($fp);
    }

    /**
     * 减库存
     * @param  [type] $event [description]
     * @return [type]        [description]
     */
    public static function reduceStocks($event)
    {
        foreach ($event->order_goods as $value) {
            M('goods', 'GoodsData')::updateAllCounters(['stocks' => (0 - $value['goods_number'])], ['goods_id' => $value['goods_id'], 'param_value' => $value['goods_param']]);
            Goods::updateAllCounters(['stocks' => (0 - $value['goods_number'])], ['id' => $value['goods_id']]);
        }
    }

    /**
     * 加库存
     * @param  [type] $event [description]
     * @return [type]        [description]
     */
    public static function addStocks($event)
    {
        foreach ($event->cancel_order_goods as $value) {
            M('goods', 'GoodsData')::updateAllCounters(['stocks' => $value['goods_number']], ['goods_id' => $value['goods_id'], 'param_value' => $value['goods_param']]);
            Goods::updateAllCounters(['stocks' => $value['goods_number']], ['id' => $value['goods_id']]);
        }
    }
}
