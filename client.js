/**
 * Experiment plugin: content-visibility on transcript items.
 * Injects one tagged stylesheet; disposal removes exactly that node.
 */
window.__ModuleLoader__.load({
  id: '@smalltailqwq/dsh-perf-flow',
  factory() {
    const CSS = "/*\n * Each top-level transcript item renders only while it is near the viewport.\n * Off-screen items keep their last rendered size (`auto`) and skip style\n * recalc, layout and paint, so an inherited custom property written on the\n * conversation root (width drag, composer height) restyles only what is on\n * screen instead of the whole transcript.\n *\n * Hidden items are excluded: `hidden=\"until-found\"` relies on the user-agent\n * `content-visibility: hidden` to keep a searchable zero-height box. An author\n * `content-visibility: auto` on the same element wins over that rule and leaves\n * folded rows visible, group headers included.\n */\n[data-conversation-scroll] [data-chat-flow] > [data-chat-flow-key]:not([hidden]),\n[data-conversation-scroll] [data-chat-flow] > [data-slot] > [data-chat-flow-key]:not([hidden]) {\n  content-visibility: auto;\n  contain-intrinsic-size: auto 320px;\n}\n"
    const apply = (ctx) => {
      const style = document.createElement('style')
      style.setAttribute('data-perf-flow', '')
      style.textContent = CSS
      ctx.effect(() => () => { style.remove() }, 'perf-flow: transcript containment')
      document.head.append(style)
    }
    return { apply }
  },
})
