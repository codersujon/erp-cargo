<template>
  <div class="cyber-glow-viewport">

    <div class="bg-glow-orb orb-top-left"></div>
    <div class="bg-glow-orb orb-top-right"></div>
    <div class="bg-glow-orb orb-bottom-center"></div>

    <div class="app-container">

      <header class="app-header">
        <div class="neon-badge">
          <span class="pulse-node"></span> SMART METRIC CONSOLE
        </div>
        <h1>Token <span class="gradient-glow">Formatter</span></h1>
        <p class="subtitle">Instantly extract and isolate smart meter tokens with ambient accuracy.</p>
      </header>

      <div class="glass-console">
        <div class="input-glow-wrapper">
          <textarea v-model="smsText" placeholder="Paste your meter SMS text here..." spellcheck="false"></textarea>
        </div>

        <div class="action-layout">
          <button class="glow-btn btn-primary" @click="formatTokens">
            🚀 Format Tokens
          </button>
          <button class="glow-btn btn-secondary" @click="copyAll" :disabled="!tokens.length">
            Copy All
          </button>
          <button class="glow-btn btn-danger" @click="clearAll">
            Clear
          </button>
        </div>
      </div>

      <div v-if="tokens.length" class="metrics-grid">
        <div class="metric-glass-card">
          <span class="metric-title">EXTRACTED</span>
          <span class="metric-num neon-blue">{{ tokens.length }}</span>
        </div>
        <div class="metric-glass-card">
          <span class="metric-title">COMPLETED</span>
          <span class="metric-num neon-green">{{ completedCount }}</span>
        </div>
      </div>

      <div v-if="tokens.length" class="token-stream">
        <div v-for="(token, index) in tokens" :key="token.value" class="stream-row-card"
          :class="{ 'is-verified': token.done }">
          <div class="stream-card-header">
            <span class="stream-tag">SYSTEM_NODE // 0{{ index + 1 }}</span>
            <span v-if="token.done" class="success-glow-pill">SUCCESS</span>
          </div>

          <div class="stream-card-body">
            <div class="token-digital-display">{{ token.value }}</div>
          </div>

          <div class="stream-card-footer">
            <button class="action-control copy" @click="copyToken(token.value)">
              Copy Code
            </button>
            <button class="action-control status-toggle" :class="{ 'active-done': token.done }"
              @click="toggleDone(index)">
              {{ token.done ? 'Undo' : 'Mark Done' }}
            </button>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
  import {
    ref,
    computed
  } from "vue";

  const smsText = ref("");
  const tokens = ref([]);

  const completedCount = computed(() => {
    return tokens.value.filter(t => t.done).length;
  });

  const formatTokens = () => {
    const regex = /\d{4}-\d{4}-\d{4}-\d{4}-\d{4}/g;
    const matches = smsText.value.match(regex) || [];
    tokens.value = matches.map(token => ({
      value: token,
      done: false
    }));
  };

  const copyToken = async (token) => {
    try {
      await navigator.clipboard.writeText(token);
    } catch (error) {
      console.error(error);
    }
  };

  const copyAll = async () => {
    const allTokens = tokens.value.map(item => item.value).join("\n");
    await navigator.clipboard.writeText(allTokens);
  };

  const toggleDone = (index) => {
    tokens.value[index].done = !tokens.value[index].done;
  };

  const clearAll = () => {
    smsText.value = "";
    tokens.value = [];
  };
</script>

<style scoped>
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;700;800&family=JetBrains+Mono:wght@700&display=swap');

  /* Main Root & Reset Layout */
  .cyber-glow-viewport {
    min-height: 100vh;
    background-color: #030712;
    color: #f9fafb;
    font-family: 'Plus Jakarta Sans', sans-serif;
    padding: 50px 16px;
    box-sizing: border-box;
    position: relative;
    overflow-x: hidden;
  }

  /* 🪐 100% Safe Background Ambient Glow Lightings */
  .bg-glow-orb {
    position: fixed;
    width: 450px;
    height: 450px;
    border-radius: 50%;
    filter: blur(120px);
    z-index: 0;
    pointer-events: none;
    /* যাতে মাউস বা টাচে কোনো ডিস্টার্ব না হয় */
    opacity: 0.35;
  }

  .orb-top-left {
    background: radial-gradient(circle, #4f46e5 0%, transparent 70%);
    top: -150px;
    left: -150px;
  }

  .orb-top-right {
    background: radial-gradient(circle, #ec4899 0%, transparent 70%);
    top: -100px;
    right: -150px;
  }

  .orb-bottom-center {
    width: 600px;
    height: 600px;
    background: radial-gradient(circle, #06b6d4 0%, transparent 70%);
    bottom: -250px;
    left: 50%;
    transform: translateX(-50%);
    opacity: 0.2;
  }

  /* App Core Container */
  .app-container {
    position: relative;
    z-index: 10;
    /* ব্যাকগ্রাউন্ড লাইটের ওপরে কন্টেন্ট লক */
    max-width: 580px;
    margin: 0 auto;
  }

  /* Header Stylings */
  .app-header {
    text-align: center;
    margin-bottom: 35px;
  }

  .neon-badge {
    background: rgba(99, 102, 241, 0.08);
    border: 1px solid rgba(99, 102, 241, 0.25);
    color: #a5b4fc;
    padding: 6px 14px;
    border-radius: 100px;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 1px;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 16px;
  }

  .pulse-node {
    width: 6px;
    height: 6px;
    background-color: #6366f1;
    border-radius: 50%;
    box-shadow: 0 0 10px #6366f1, 0 0 20px #6366f1;
  }

  h1 {
    font-size: 3rem;
    font-weight: 800;
    letter-spacing: -1.5px;
    margin: 0 0 10px 0;
  }

  .gradient-glow {
    background: linear-gradient(135deg, #a78bfa, #f43f5e);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    filter: drop-shadow(0 0 25px rgba(244, 63, 94, 0.4));
  }

  .subtitle {
    color: #94a3b8;
    font-size: 0.95rem;
    margin: 0;
  }

  /* Glassmorphic Panel (ChatGPT-এর চেয়ে প্রিমিয়াম ব্লার লুক) */
  .glass-console {
    background: rgba(15, 23, 42, 0.65);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border: 1px solid rgba(255, 255, 255, 0.07);
    border-radius: 24px;
    padding: 24px;
    box-shadow: 0 20px 50px -12px rgba(0, 0, 0, 0.7),
      inset 0 1px 1px rgba(255, 255, 255, 0.1);
  }

  textarea {
    width: 100%;
    height: 150px;
    background-color: rgba(2, 6, 23, 0.7);
    border: 1px solid rgba(255, 255, 255, 0.05);
    border-radius: 14px;
    padding: 16px;
    color: #f9fafb;
    font-family: 'JetBrains Mono', monospace;
    font-size: 14px;
    line-height: 1.6;
    resize: none;
    box-sizing: border-box;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }

  textarea:focus {
    outline: none;
    border-color: rgba(99, 102, 241, 0.5);
    box-shadow: 0 0 20px rgba(99, 102, 241, 0.25);
    background-color: #020617;
  }

  /* Button UI Layout */
  .action-layout {
    display: flex;
    gap: 12px;
    margin-top: 20px;
  }

  .glow-btn {
    flex: 1;
    padding: 13px 16px;
    border-radius: 12px;
    font-weight: 700;
    font-size: 14px;
    cursor: pointer;
    border: none;
    transition: all 0.2s ease;
  }

  .glow-btn:active {
    transform: scale(0.97);
  }

  .glow-btn:disabled {
    opacity: 0.2;
    cursor: not-allowed;
  }

  .btn-primary {
    background: linear-gradient(135deg, #4f46e5, #6366f1);
    color: white;
    box-shadow: 0 4px 25px rgba(99, 102, 241, 0.35);
  }

  .btn-primary:hover {
    box-shadow: 0 4px 35px rgba(99, 102, 241, 0.55);
  }

  .btn-secondary {
    background: rgba(255, 255, 255, 0.05);
    color: #e5e7eb;
    border: 1px solid rgba(255, 255, 255, 0.08);
  }

  .btn-secondary:hover {
    background: rgba(255, 255, 255, 0.1);
  }

  .btn-danger {
    background: rgba(239, 68, 68, 0.1);
    color: #ef4444;
    border: 1px solid rgba(239, 68, 68, 0.2);
  }

  .btn-danger:hover {
    background: #ef4444;
    color: white;
    box-shadow: 0 0 20px rgba(239, 68, 68, 0.4);
  }

  /* Grid Metrics Board */
  .metrics-grid {
    display: flex;
    gap: 14px;
    margin-top: 24px;
  }

  .metric-glass-card {
    flex: 1;
    background: rgba(15, 23, 42, 0.5);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.05);
    border-radius: 16px;
    padding: 16px;
  }

  .metric-title {
    font-size: 10px;
    color: #64748b;
    text-transform: uppercase;
    letter-spacing: 0.7px;
    display: block;
    margin-bottom: 4px;
    font-weight: 700;
  }

  .metric-num {
    font-size: 1.7rem;
    font-weight: 800;
  }

  .neon-blue {
    color: #38bdf8;
    text-shadow: 0 0 15px rgba(56, 189, 248, 0.4);
  }

  .neon-green {
    color: #34d399;
    text-shadow: 0 0 15px rgba(52, 211, 153, 0.4);
  }

  /* Token Card Stream Feed */
  .token-stream {
    margin-top: 24px;
    display: flex;
    flex-direction: column;
    gap: 14px;
  }

  .stream-row-card {
    background: rgba(15, 23, 42, 0.6);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.05);
    border-radius: 18px;
    padding: 20px;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .stream-row-card:hover {
    border-color: rgba(99, 102, 241, 0.35);
    box-shadow: 0 0 25px rgba(99, 102, 241, 0.15);
  }

  .stream-row-card.is-verified {
    border-color: rgba(52, 211, 153, 0.25);
    background: rgba(2, 6, 23, 0.5);
  }

  .stream-card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .stream-tag {
    font-size: 10px;
    color: #475569;
    font-family: monospace;
    letter-spacing: 0.5px;
  }

  .success-glow-pill {
    background: rgba(52, 211, 153, 0.12);
    color: #34d399;
    font-size: 10px;
    padding: 3px 9px;
    border-radius: 5px;
    font-weight: 700;
    letter-spacing: 0.5px;
    box-shadow: 0 0 12px rgba(52, 211, 153, 0.25);
  }

  .token-digital-display {
    font-family: 'JetBrains Mono', monospace;
    font-size: 1.5rem;
    font-weight: 700;
    color: #ffffff;
    text-align: center;
    margin: 20px 0;
    letter-spacing: 1px;
    text-shadow: 0 0 15px rgba(255, 255, 255, 0.08);
  }

  .is-verified .token-digital-display {
    color: #475569;
    text-shadow: none;
    text-decoration: line-through;
  }

  .stream-card-footer {
    display: flex;
    gap: 10px;
  }

  .action-control {
    flex: 1;
    padding: 10px;
    border-radius: 10px;
    font-size: 13px;
    font-weight: 700;
    cursor: pointer;
    background: rgba(2, 6, 23, 0.6);
    border: 1px solid rgba(255, 255, 255, 0.05);
    color: #94a3b8;
    transition: all 0.2s;
  }

  .action-control:hover {
    background: rgba(255, 255, 255, 0.08);
    color: white;
  }

  .status-toggle.active-done {
    border-color: rgba(239, 68, 68, 0.3);
    color: #f87171;
  }

  .status-toggle:not(.active-done):hover {
    border-color: rgba(52, 211, 153, 0.4);
    color: #34d399;
    box-shadow: 0 0 12px rgba(52, 211, 153, 0.2);
  }

  /* 📱 Ironclad Mobile Protection Layer */
  @media (max-width: 480px) {
    .action-layout {
      flex-direction: column;
    }

    .glow-btn {
      width: 100%;
    }

    .token-digital-display {
      font-size: 1.2rem;
      letter-spacing: 0px;
    }

    .bg-glow-orb {
      width: 280px;
      height: 280px;
    }
  }
</style>