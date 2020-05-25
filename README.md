### vue-slider-captcha 滑动验证

#### 使用方法

> npm i vue-slider-captcha

```javascript
import VueSliderCaptcha from "vue-slider-captcha";
components{
  VueSliderCaptcha
}
```

> 引入以下代码

```javascript
<VueSliderCaptcha
ref="dragVerify"
src="https://yimijianfang.github.io/vue-drag-verify/static/img/t3.f6f8c53.png"
:value.sync="value"
color="#1890ff"
successText="验证通过"
@refresh="onRefresh"
@passcallback="onPassCallBack"
/>
```

#### API

##### props

| 参数        | 说明         | type    | 默认值                     |
| ----------- | ------------ | ------- | -------------------------- |
| value       | 验证状态     | Boolean | false                      |
| text        | 初始文字     | String  | 向右拖动滑块填充拼图       |
| successText | 成功提示文字 | String  | 验证通过                   |
| failTip     | 成功提示文字 | String  | 拖动滑块将悬浮图像正确合并 |
| color       | 主题颜色     | String  | #76c61d                    |
| src         | 图片地址     | String  | -                          |
| diff        | 误差范围     | Number  | 10                         |

##### methods

| 参数  | 说明         | type | 默认值 |
| ----- | ------------ | ---- | ------ |
| reset | 重置验证状态 |      | -      |

##### event

| 事件名称     | 说明         | 回调参数 |
| ------------ | ------------ | -------- |
| refresh      | 点击刷新回调 | -        |
| passcallback | 验证通过回调 | -        |

[演示](https://531431988.github.io/vue-slider-captcha/dist/)
