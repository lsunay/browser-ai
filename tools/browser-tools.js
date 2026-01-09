// Cross-browser compatibility
if (typeof browser === 'undefined') {
  var browser = chrome;
}

// Browser Automation Tools
export class BrowserTools {
  constructor() {
    this.tools = this.initializeTools();
  }

  initializeTools() {
    return {
      navigate: this.navigate.bind(this),
      click: this.click.bind(this),
      type: this.type.bind(this),
      scroll: this.scroll.bind(this),
      screenshot: this.screenshot.bind(this),
      getPageContent: this.getPageContent.bind(this),
      openTab: this.openTab.bind(this),
      closeTab: this.closeTab.bind(this),
      switchTab: this.switchTab.bind(this),
      createTabGroup: this.createTabGroup.bind(this),
      ungroupTabs: this.ungroupTabs.bind(this),
      fillForm: this.fillForm.bind(this),
      waitForElement: this.waitForElement.bind(this),
      getAllTabs: this.getAllTabs.bind(this),
      goBack: this.goBack.bind(this),
      goForward: this.goForward.bind(this),
      refresh: this.refresh.bind(this),
      searchHistory: this.searchHistory.bind(this),
      getRecentHistory: this.getRecentHistory.bind(this),
      deleteHistoryItem: this.deleteHistoryItem.bind(this),
      deleteHistoryRange: this.deleteHistoryRange.bind(this),
      getVisitCount: this.getVisitCount.bind(this)
    };
  }

  getToolDefinitions() {
    return [
      {
        name: 'navigate',
        description: 'Navigate to a URL...',
        input_schema: {
          type: 'object',
          properties: {
            url: { type: 'string', description: 'The URL to navigate to.' },
            tabId: { type: 'number', description: 'Optional tab ID.' }
          },
          required: ['url']
        }
      },
      {
        name: 'click',
        description: 'Click on an element. Use labelText for buttons or links identified by visible text.',
        input_schema: {
          type: 'object',
          properties: {
            selector: { type: 'string', description: 'A specific CSS selector for the element.' },
            labelText: { type: 'string', description: 'The visible text, aria-label, or placeholder of the element to click.' },
            tabId: { type: 'number', description: 'Optional tab ID.' }
          },
          required: []
        }
      },
      {
        name: 'type',
        description: 'Type text into an input field, identified by its visible label, placeholder, or a specific selector.',
        input_schema: {
          type: 'object',
          properties: {
            selector: { type: 'string', description: 'A specific CSS selector for the input field.' },
            labelText: { type: 'string', description: 'The visible text of the label associated with the input, or the input\'s placeholder or aria-label.' },
            text: { type: 'string', description: 'The text to type.' },
            clear: { type: 'boolean', description: 'Clear existing text first (default: true).' },
            tabId: { type: 'number', description: 'Optional tab ID.' }
          },
          required: ['text']
        }
      },
      {
        name: 'scroll',
        description: 'Scroll the page up or down.',
        input_schema: {
          type: 'object',
          properties: {
            direction: { type: 'string', description: 'The direction to scroll: "up", "down", "top", or "bottom".' },
            amount: { type: 'number', description: 'The amount to scroll in pixels (default: 500).' },
            tabId: { type: 'number', description: 'Optional tab ID.' }
          },
          required: ['direction']
        }
      },
      {
        name: 'screenshot',
        description: 'Take a screenshot of the current page.',
        input_schema: {
          type: 'object',
          properties: {
            tabId: { type: 'number', description: 'Optional tab ID.' }
          },
          required: []
        }
      },
      {
        name: 'getPageContent',
        description: 'Get content from the current page.',
        input_schema: {
          type: 'object',
          properties: {
            type: { type: 'string', description: 'The type of content to retrieve: "text", "html", "title", "url", or "links".' },
            selector: { type: 'string', description: 'Optional CSS selector to target specific elements.' },
            tabId: { type: 'number', description: 'Optional tab ID.' }
          },
          required: []
        }
      },
      {
        name: 'openTab',
        description: 'Open a new tab.',
        input_schema: {
          type: 'object',
          properties: {
            url: { type: 'string', description: 'The URL to open in the new tab.' },
            active: { type: 'boolean', description: 'Whether to activate the new tab (default: true).' }
          },
          required: ['url']
        }
      },
      {
        name: 'closeTab',
        description: 'Close a tab.',
        input_schema: {
          type: 'object',
          properties: {
            tabId: { type: 'number', description: 'The tab ID to close.' }
          },
          required: []
        }
      },
      {
        name: 'switchTab',
        description: 'Switch to a different tab.',
        input_schema: {
          type: 'object',
          properties: {
            tabId: { type: 'number', description: 'The tab ID to switch to.' }
          },
          required: ['tabId']
        }
      },
      {
        name: 'createTabGroup',
        description: 'Create a tab group.',
        input_schema: {
          type: 'object',
          properties: {
            tabIds: { type: 'array', items: { type: 'number' }, description: 'Array of tab IDs to group.' },
            title: { type: 'string', description: 'Title for the tab group.' },
            color: { type: 'string', description: 'Color for the tab group (default: "grey").' }
          },
          required: ['tabIds']
        }
      },
      {
        name: 'ungroupTabs',
        description: 'Ungroup tabs.',
        input_schema: {
          type: 'object',
          properties: {
            tabIds: { type: 'array', items: { type: 'number' }, description: 'Array of tab IDs to ungroup.' }
          },
          required: ['tabIds']
        }
      },
      {
        name: 'fillForm',
        description: 'Fill a form with provided data.',
        input_schema: {
          type: 'object',
          properties: {
            fields: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  selector: { type: 'string', description: 'CSS selector for the input field.' },
                  value: { type: 'string', description: 'Value to fill in the field.' }
                },
                required: ['selector', 'value']
              },
              description: 'Array of fields to fill.'
            },
            tabId: { type: 'number', description: 'Optional tab ID.' }
          },
          required: ['fields']
        }
      },
      {
        name: 'waitForElement',
        description: 'Wait for an element to appear on the page.',
        input_schema: {
          type: 'object',
          properties: {
            selector: { type: 'string', description: 'CSS selector of the element to wait for.' },
            timeout: { type: 'number', description: 'Timeout in milliseconds (default: 5000).' },
            tabId: { type: 'number', description: 'Optional tab ID.' }
          },
          required: ['selector']
        }
      },
      {
        name: 'getAllTabs',
        description: 'Get information about all tabs.',
        input_schema: {
          type: 'object',
          properties: {},
          required: []
        }
      },
      {
        name: 'goBack',
        description: 'Navigate back in browser history.',
        input_schema: {
          type: 'object',
          properties: {
            tabId: { type: 'number', description: 'Optional tab ID.' }
          },
          required: []
        }
      },
      {
        name: 'goForward',
        description: 'Navigate forward in browser history.',
        input_schema: {
          type: 'object',
          properties: {
            tabId: { type: 'number', description: 'Optional tab ID.' }
          },
          required: []
        }
      },
      {
        name: 'refresh',
        description: 'Refresh the current page.',
        input_schema: {
          type: 'object',
          properties: {
            tabId: { type: 'number', description: 'Optional tab ID.' }
          },
          required: []
        }
      },
      {
        name: 'searchHistory',
        description: 'Search browser history.',
        input_schema: {
          type: 'object',
          properties: {
            text: { type: 'string', description: 'Text to search for in history.' },
            maxResults: { type: 'number', description: 'Maximum number of results (default: 100).' }
          },
          required: ['text']
        }
      },
      {
        name: 'getRecentHistory',
        description: 'Get recent browser history.',
        input_schema: {
          type: 'object',
          properties: {
            maxResults: { type: 'number', description: 'Maximum number of results (default: 50).' }
          },
          required: []
        }
      },
      {
        name: 'deleteHistoryItem',
        description: 'Delete a specific item from browser history.',
        input_schema: {
          type: 'object',
          properties: {
            url: { type: 'string', description: 'URL of the history item to delete.' }
          },
          required: ['url']
        }
      },
      {
        name: 'deleteHistoryRange',
        description: 'Delete a range of items from browser history.',
        input_schema: {
          type: 'object',
          properties: {
            startTime: { type: 'number', description: 'Start time for the range (timestamp).' },
            endTime: { type: 'number', description: 'End time for the range (timestamp).' }
          },
          required: ['startTime', 'endTime']
        }
      },
      {
        name: 'getVisitCount',
        description: 'Get visit count for a URL.',
        input_schema: {
          type: 'object',
          properties: {
            url: { type: 'string', description: 'URL to get visit count for.' }
          },
          required: ['url']
        }
      }
    ];
  }

  async executeTool(toolName, args) {
    const tool = this.tools[toolName];
    if (!tool) throw new Error(`Unknown tool: ${toolName}`);
    const finalArgs = args && typeof args === 'object' ? args : {};
    return await tool(finalArgs);
  }

  async getActiveTabId(providedTabId) {
    if (providedTabId) return providedTabId;
    const [tab] = await browser.tabs.query({ active: true, currentWindow: true });
    if (!tab) throw new Error("No active tab found.");
    return tab.id;
  }

  // Tool implementations with NEW logic for click and type

  async navigate({ url, tabId }) {
    const targetTabId = await this.getActiveTabId(tabId);
    await browser.tabs.update(targetTabId, { url });
    return { success: true, url, tabId: targetTabId };
  }

  async click({ selector, labelText, tabId }) {
    const targetTabId = await this.getActiveTabId(tabId);
    if (!selector && !labelText) {
      return { success: false, error: 'Either selector or labelText must be provided' };
    }
    try {
      const [result] = await browser.scripting.executeScript({
        target: { tabId: targetTabId },
        func: (sel, label) => {
          let element = null;
          if (sel) {
            element = document.querySelector(sel);
          } else if (label) {
            const candidates = Array.from(document.querySelectorAll('a, button, input, [role="button"], [aria-label]'));
            element = candidates.find(el => 
              (el.textContent && el.textContent.trim().toLowerCase().includes(label.toLowerCase())) ||
              (el.ariaLabel && el.ariaLabel.toLowerCase().includes(label.toLowerCase())) ||
              (el.value && el.value.toLowerCase().includes(label.toLowerCase()))
            );
          }
          if (element) {
            element.click();
            return { success: true, clicked: sel || label };
          }
          return { success: false, error: 'Element not found' };
        },
        args: [selector, labelText]
      });
      return result.result;
    } catch (error) {
      return { success: false, error: `Execution failed: ${error.message}` };
    }
  }

  async type({ selector, labelText, text, clear = true, tabId }) {
    const targetTabId = await this.getActiveTabId(tabId);
    if (!selector && !labelText) {
      return { success: false, error: 'Either selector or labelText must be provided' };
    }
    try {
      const [result] = await browser.scripting.executeScript({
        target: { tabId: targetTabId },
        func: (sel, label, txt, clr) => {
          let element = null;
          if (sel) {
            element = document.querySelector(sel);
          } else if (label) {
            const candidates = Array.from(document.querySelectorAll('input, textarea, [aria-label], [placeholder]'));
            element = candidates.find(el => 
              (el.ariaLabel && el.ariaLabel.toLowerCase().includes(label.toLowerCase())) ||
              (el.placeholder && el.placeholder.toLowerCase().includes(label.toLowerCase()))
            );
            // Fallback to finding an input near a label tag
            if (!element) {
              const labelEl = Array.from(document.querySelectorAll('label')).find(l => l.textContent.trim().toLowerCase().includes(label.toLowerCase()));
              if (labelEl) {
                const inputId = labelEl.getAttribute('for');
                if (inputId) {
                  element = document.getElementById(inputId);
                } else {
                  element = labelEl.querySelector('input, textarea');
                }
              }
            }
          }
          if (element) {
            element.focus();
            if (clr) element.value = '';
            element.value = txt;
            element.dispatchEvent(new Event('input', { bubbles: true }));
            element.dispatchEvent(new Event('change', { bubbles: true }));
            return { success: true };
          }
          return { success: false, error: 'Element not found' };
        },
        args: [selector, labelText, text, clear]
      });
      return result.result;
    } catch (error) {
      return { success: false, error: `Execution failed: ${error.message}` };
    }
  }

  // ... (rest of the tool implementations remain the same)
  async scroll({ direction, amount = 500, tabId }) {
    const targetTabId = await this.getActiveTabId(tabId);
    try {
      const [result] = await browser.scripting.executeScript({
        target: { tabId: targetTabId },
        func: (dir, amt) => {
          let scrollOptions = { behavior: 'smooth' };
          switch (dir) {
            case 'up': window.scrollBy({ top: -amt, ...scrollOptions }); break;
            case 'down': window.scrollBy({ top: amt, ...scrollOptions }); break;
            case 'top': window.scrollTo({ top: 0, ...scrollOptions }); break;
            case 'bottom': window.scrollTo({ top: document.body.scrollHeight, ...scrollOptions }); break;
          }
          return { success: true, scrollY: window.scrollY };
        },
        args: [direction, amount]
      });
      return result.result;
    } catch (error) {
      return { success: false, error: `Execution failed: ${error.message}` };
    }
  }

  async screenshot({ tabId }) {
    const targetTabId = await this.getActiveTabId(tabId);
    const dataUrl = await browser.tabs.captureVisibleTab(null, { format: 'png' });
    return { success: true, dataUrl, tabId: targetTabId };
  }

  async getPageContent({ type, selector, tabId }) {
    const targetTabId = await this.getActiveTabId(tabId);
    const finalType = ['text', 'html', 'title', 'url', 'links'].includes(type) ? type : 'text';
    try {
      const [result] = await browser.scripting.executeScript({
        target: { tabId: targetTabId },
        func: (contentType, sel) => {
          const getContent = () => {
            switch (contentType) {
              case 'text': return sel ? document.querySelector(sel)?.innerText : document.body.innerText;
              case 'html': return sel ? document.querySelector(sel)?.innerHTML : document.documentElement.outerHTML;
              case 'title': return document.title;
              case 'url': return window.location.href;
              case 'links': return Array.from(document.querySelectorAll('a')).map(a => ({ text: a.innerText || '', href: a.href || '' }));
              default: return null;
            }
          };
          const content = getContent();
          return { success: true, type: contentType, content };
        },
        args: [finalType, selector]
      });
      return result.result;
    } catch (error) {
      return { success: false, error: `Execution failed: ${error.message}` };
    }
  }

  async openTab({ url, active = true }) {
    const tab = await browser.tabs.create({ url, active });
    return { success: true, tabId: tab.id, url: tab.pendingUrl || tab.url };
  }

  async closeTab({ tabId }) {
    const targetTabId = await this.getActiveTabId(tabId);
    await browser.tabs.remove(targetTabId);
    return { success: true, tabId: targetTabId };
  }

  async switchTab({ tabId }) {
    await browser.tabs.update(tabId, { active: true });
    return { success: true, tabId };
  }

  async getAllTabs() {
    const tabs = await browser.tabs.query({});
    return {
      success: true,
      tabs: tabs.map(t => ({ id: t.id, title: t.title, url: t.url, active: t.active, groupId: t.groupId }))
    };
  }

  async createTabGroup({ tabIds, title, color = 'grey' }) {
    if (!browser.tabs.group) return { success: false, error: 'Tab groups not supported' };
    const groupId = await browser.tabs.group({ tabIds });
    await browser.tabGroups.update(groupId, { title, color });
    return { success: true, groupId };
  }

  async ungroupTabs({ tabIds }) {
    if (!browser.tabs.ungroup) return { success: false, error: 'Tab groups not supported' };
    await browser.tabs.ungroup(tabIds);
    return { success: true };
  }

  async fillForm({ fields, tabId }) {
    const targetTabId = await this.getActiveTabId(tabId);
    try {
      const [result] = await browser.scripting.executeScript({
        target: { tabId: targetTabId },
        func: (fieldList) => {
          const results = [];
          for (const field of fieldList) {
            const element = document.querySelector(field.selector);
            if (element) {
              element.value = field.value;
              element.dispatchEvent(new Event('input', { bubbles: true }));
              results.push({ selector: field.selector, success: true });
            } else {
              results.push({ selector: field.selector, success: false, error: 'Element not found' });
            }
          }
          return { success: true, results };
        },
        args: [fields]
      });
      return result.result;
    } catch (error) {
      return { success: false, error: `Execution failed: ${error.message}` };
    }
  }

  async waitForElement({ selector, timeout = 5000, tabId }) {
    const targetTabId = await this.getActiveTabId(tabId);
    try {
      const [result] = await browser.scripting.executeScript({
        target: { tabId: targetTabId },
        func: (sel, maxWait) => {
          return new Promise(resolve => {
            const startTime = Date.now();
            const interval = setInterval(() => {
              const element = document.querySelector(sel);
              if (element) {
                clearInterval(interval);
                resolve({ success: true, found: true });
              } else if (Date.now() - startTime > maxWait) {
                clearInterval(interval);
                resolve({ success: false, found: false, error: 'Timeout' });
              }
            }, 100);
          });
        },
        args: [selector, timeout]
      });
      return result.result;
    } catch (error) {
      return { success: false, error: `Execution failed: ${error.message}` };
    }
  }

  async goBack({ tabId }) {
    const targetTabId = await this.getActiveTabId(tabId);
    await browser.tabs.goBack(targetTabId);
    return { success: true };
  }

  async goForward({ tabId }) {
    const targetTabId = await this.getActiveTabId(tabId);
    await browser.tabs.goForward(targetTabId);
    return { success: true };
  }

  async refresh({ tabId }) {
    const targetTabId = await this.getActiveTabId(tabId);
    await browser.tabs.reload(targetTabId);
    return { success: true };
  }

  async searchHistory({ text, maxResults = 100 }) {
    const results = await browser.history.search({ text, maxResults });
    return { success: true, results };
  }

  async getRecentHistory({ maxResults = 50 }) {
    const results = await browser.history.search({ text: '', maxResults });
    return { success: true, results };
  }

  async deleteHistoryItem({ url }) {
    await browser.history.deleteUrl({ url });
    return { success: true };
  }

  async deleteHistoryRange({ startTime, endTime }) {
    await browser.history.deleteRange({ startTime, endTime });
    return { success: true };
  }

  async getVisitCount({ url }) {
    const visits = await browser.history.getVisits({ url });
    return { success: true, visitCount: visits.length, visits };
  }
}