/**
 * Experiment plugin: content-visibility on transcript items.
 * Injects one tagged stylesheet; disposal removes exactly that node.
 */
window.__ModuleLoader__.load({
  id: '@smalltailqwq/dsh-perf-flow',
  factory() {
    const CSS = "/*\n * Each top-level transcript item renders only while it is near the viewport.\n * Off-screen items keep their last rendered size (`auto`) and skip style\n * recalc, layout and paint, so an inherited custom property written on the\n * conversation root (width drag, composer height) restyles only what is on\n * screen instead of the whole transcript.\n *\n * Hidden items are excluded: `hidden=\"until-found\"` relies on the user-agent\n * `content-visibility: hidden` to keep a searchable zero-height box. An author\n * `content-visibility: auto` on the same element wins over that rule and leaves\n * folded rows visible, group headers included. The size estimates below are\n * excluded for the same reason: under `content-visibility: hidden` the box\n * takes its intrinsic size, so an estimate would reopen the folded gap.\n *\n * `content-visibility: auto` always implies paint containment, which clips\n * anything painted outside the item: message actions pulled 6px left for\n * optical alignment, focus rings, and wide markdown tables that break out to\n * the transcript edges by up to `(100cqw - column) / 2`. The clip margin\n * restores that overflow; `cqw` resolves against the transcript scroller.\n */\n[data-conversation-scroll] [data-chat-flow] > [data-chat-flow-key]:not([hidden]),\n[data-conversation-scroll] [data-chat-flow] > [data-slot] > [data-chat-flow-key]:not([hidden]) {\n  content-visibility: auto;\n  contain-intrinsic-block-size: auto 320px;\n  overflow-clip-margin: 50cqw;\n}\n\n/*\n * Process rows (tool calls, reasoning, group headers) are one 24px line until\n * opened. A row that has never rendered, such as history above the initial\n * scroll position or members of a height-capped process group, would\n * otherwise reserve 320px each and distort the scroll range.\n */\n[data-conversation-scroll] [data-chat-flow] > [data-chat-flow-key]:is([data-chat-group-key], [data-turn-process-member]):not([hidden]),\n[data-conversation-scroll] [data-chat-flow] > [data-slot] > [data-chat-flow-key]:is([data-chat-group-key], [data-turn-process-member]):not([hidden]),\n[data-conversation-scroll] [data-chat-flow][data-step-process-content] > [data-chat-flow-key]:not([hidden]),\n[data-conversation-scroll] [data-chat-flow][data-step-process-content] > [data-slot] > [data-chat-flow-key]:not([hidden]) {\n  contain-intrinsic-block-size: auto 24px;\n}\n"
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
