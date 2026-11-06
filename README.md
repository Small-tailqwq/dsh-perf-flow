# DSH 会话流畅优化

为长会话中的屏幕外消息启用浏览器的 `content-visibility`，减少不在视口附近的内容的渲染工作。效果取决于会话内容和浏览器。

![会话流畅优化示意图](docs/preview.zh.svg)

## 安装

在 DSH 的插件页面选择添加插件，输入：

```text
https://github.com/Small-tailqwq/dsh-perf-flow.git
```

也可以使用命令：

```sh
dsh plugin add https://github.com/Small-tailqwq/dsh-perf-flow.git
```

安装后在插件页面启用「会话流畅优化」。组合包包含一个同名组件，可以单独关闭；关闭后注入的样式会被移除。

## 注意

这是实验性优化，依赖 DSH 会话界面的 DOM 结构和浏览器对 `content-visibility` 的支持。长消息进入视口时的尺寸估算可能影响滚动体验；如果遇到显示或滚动异常，可在插件页面关闭组件。
