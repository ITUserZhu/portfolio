import { ref, onMounted } from 'vue';

export function useSpeech() {
  const isSpeaking = ref(false);
  const isSupported = ref(false);
  const voices = ref([]);

  // 检查浏览器是否支持语音合成
  if ('speechSynthesis' in window) {
    isSupported.value = true;
  }

  // 加载语音
  function loadVoices() {
    voices.value = speechSynthesis.getVoices();
    console.log('可用语音:', voices.value.length);
  }

  // 初始化语音
  onMounted(() => {
    if (isSupported.value) {
      loadVoices();
      // 某些浏览器需要等待语音加载
      speechSynthesis.onvoiceschanged = loadVoices;
    }
  });

  // 播放语音
  function speak(text, options = {}) {
    if (!isSupported.value) {
      console.warn('浏览器不支持语音合成');
      return;
    }

    // 停止当前播放
    stop();

    // 创建语音实例
    const utterance = new SpeechSynthesisUtterance(text);
    
    // 配置语音参数
    utterance.lang = options.lang || 'en-US'; // 语言
    utterance.rate = options.rate || 0.8; // 语速 (0.1 - 10)
    utterance.pitch = options.pitch || 1; // 音调 (0 - 2)
    utterance.volume = options.volume || 1; // 音量 (0 - 1)

    // 选择语音
    if (voices.value.length > 0) {
      // 优先选择英语语音
      const englishVoice = voices.value.find(voice => 
        voice.lang.startsWith('en') && voice.name.includes('Google')
      ) || voices.value.find(voice => voice.lang.startsWith('en'));
      
      if (englishVoice) {
        utterance.voice = englishVoice;
        console.log('使用语音:', englishVoice.name);
      }
    }

    console.log('开始播放语音:', text);

    // 开始播放
    utterance.onstart = () => {
      isSpeaking.value = true;
      console.log('语音开始播放');
    };

    // 播放结束
    utterance.onend = () => {
      isSpeaking.value = false;
      console.log('语音播放结束');
    };

    // 播放错误
    utterance.onerror = (event) => {
      // 忽略 "interrupted" 错误，这是正常的中断行为
      if (event.error === 'interrupted') {
        console.log('语音播放被中断（正常行为）');
      } else {
        console.error('语音播放错误:', event.error);
        console.error('错误详情:', {
          error: event.error,
          charIndex: event.charIndex,
          elapsedTime: event.elapsedTime,
          name: event.name
        });
        
        // 如果是权限问题，提示用户
        if (event.error === 'not-allowed') {
          console.warn('语音播放需要用户交互，请确保在用户点击后调用');
        }
      }
      isSpeaking.value = false;
    };

    // 尝试播放
    try {
      // 检查是否已经在播放
      if (speechSynthesis.speaking) {
        console.log('语音正在播放中，先停止');
        speechSynthesis.cancel();
      }
      
      speechSynthesis.speak(utterance);
      console.log('语音播放请求已发送');
      
      // 设置超时检查
      setTimeout(() => {
        if (!speechSynthesis.speaking && !speechSynthesis.pending) {
          console.warn('语音播放可能被阻止，尝试重新播放');
          speechSynthesis.speak(utterance);
        }
      }, 100);
      
    } catch (error) {
      console.error('语音播放失败:', error);
      isSpeaking.value = false;
    }
  }

  // 停止播放
  function stop() {
    if (speechSynthesis.speaking) {
      speechSynthesis.cancel();
      isSpeaking.value = false;
    }
  }

  // 暂停播放
  function pause() {
    if (speechSynthesis.speaking) {
      speechSynthesis.pause();
    }
  }

  // 恢复播放
  function resume() {
    if (speechSynthesis.paused) {
      speechSynthesis.resume();
    }
  }

  return {
    isSpeaking,
    isSupported,
    speak,
    stop,
    pause,
    resume
  };
}