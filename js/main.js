(function () {
  'use strict';

  const scrollContainer = document.getElementById('scroll-painting');
  const panels = document.querySelectorAll('.panel');
  const navLinks = document.querySelectorAll('.chapter-nav__list a');
  const progressBar = document.querySelector('.scroll-progress__bar');
  const langBtns = document.querySelectorAll('.lang-btn');
  const contactForm = document.getElementById('contact-form');

  /* ---- i18n 文案 ---- */
  const i18n = {
    zh: {
      'hero.eyebrow': '成都 · 锦江',
      'hero.title': '飞靓杰信',
      'hero.subtitle': '电子商务',
      'hero.desc': '以东方美学为魂，以数字商贸为翼<br>连接华夏精品与全球市场',
      'hero.cta': '展卷而读 →',
      'hero.scroll': '横卷徐行',
      'about.chapter': '壹 · 识君',
      'about.title': '公司概览',
      'about.name.label': '企业名称',
      'about.code.label': '统一社会信用代码',
      'about.addr.label': '企业地址',
      'about.para': '立足天府之国，我们秉承「诚信立业、品质为先」之理念，致力于将中国优质商品通过数字化渠道推向世界。以电商为桥，以文化为媒，让每一件好物都承载东方故事。',
      'business.chapter': '贰 · 经略',
      'business.title': '核心业务',
      'business.item1.title': '跨境电子商务',
      'business.item1.desc': '搭建全球贸易数字通道，助力中国品牌出海，引进海外精品入华。',
      'business.item2.title': '品质供应链',
      'business.item2.desc': '严选源头好物，构建从源头到消费者的品质保障体系。',
      'business.item3.title': '数字化运营',
      'business.item3.desc': '以数据驱动决策，以智能优化体验，赋能电商全链路增长。',
      'business.item4.title': '文化品牌传播',
      'business.item4.desc': '将中华文化元素融入品牌叙事，让商业更有温度与深度。',
      'culture.chapter': '叁 · 文心',
      'culture.center': '以道驭商',
      'culture.node1': '诚信为本',
      'culture.node2': '品质至上',
      'culture.node3': '创新驱动',
      'culture.node4': '和合共生',
      'culture.node5': '通达全球',
      'culture.quote': '「商者，义也。以义取利，方能久远。」',
      'contact.chapter': '肆 · 尺素',
      'contact.title': '联系我们',
      'contact.letter': '尺素传书',
      'contact.email.label': '电子邮箱',
      'contact.addr.label': '通讯地址',
      'contact.company.label': '公司名称',
      'form.name': '尊姓大名',
      'form.email': '电子邮箱',
      'form.message': '留言内容',
      'form.submit': '寄出尺素',
      'footer.tagline': '锦绣天府 · 通达四海'
    },
    en: {
      'hero.eyebrow': 'Chengdu · Jinjiang',
      'hero.title': 'Feiliang Jiexin',
      'hero.subtitle': 'E-Commerce',
      'hero.desc': 'Rooted in Eastern aesthetics, powered by digital commerce<br>Connecting Chinese excellence with global markets',
      'hero.cta': 'Unroll the Scroll →',
      'hero.scroll': 'Scroll Horizontally',
      'about.chapter': 'I · About',
      'about.title': 'Company Overview',
      'about.name.label': 'Company Name',
      'about.code.label': 'Unified Social Credit Code',
      'about.addr.label': 'Address',
      'about.para': 'Based in the Land of Abundance, we uphold the principles of integrity and quality, dedicated to bringing premium Chinese products to the world through digital channels. Commerce as bridge, culture as medium — every product tells an Eastern story.',
      'business.chapter': 'II · Business',
      'business.title': 'Core Services',
      'business.item1.title': 'Cross-Border E-Commerce',
      'business.item1.desc': 'Building digital trade corridors to help Chinese brands go global and bring international products to China.',
      'business.item2.title': 'Quality Supply Chain',
      'business.item2.desc': 'Rigorous sourcing and end-to-end quality assurance from origin to consumer.',
      'business.item3.title': 'Digital Operations',
      'business.item3.desc': 'Data-driven decisions and intelligent optimization powering full-chain e-commerce growth.',
      'business.item4.title': 'Cultural Branding',
      'business.item4.desc': 'Weaving Chinese cultural elements into brand narratives for commerce with depth and warmth.',
      'culture.chapter': 'III · Philosophy',
      'culture.center': 'Commerce with Purpose',
      'culture.node1': 'Integrity',
      'culture.node2': 'Quality First',
      'culture.node3': 'Innovation',
      'culture.node4': 'Harmony',
      'culture.node5': 'Global Reach',
      'culture.quote': '"In commerce, righteousness prevails. Profit through virtue endures."',
      'contact.chapter': 'IV · Contact',
      'contact.title': 'Get in Touch',
      'contact.letter': 'Send a Letter',
      'contact.email.label': 'Email',
      'contact.addr.label': 'Address',
      'contact.company.label': 'Company',
      'form.name': 'Your Name',
      'form.email': 'Email Address',
      'form.message': 'Message',
      'form.submit': 'Send Message',
      'footer.tagline': 'Splendor of Tianfu · Reaching the World'
    }
  };

  let currentLang = 'zh';

  function setLanguage(lang) {
    currentLang = lang;
    document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';

    langBtns.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.lang === lang);
    });

    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.dataset.i18n;
      if (i18n[lang][key]) {
        el.innerHTML = i18n[lang][key];
      }
    });
  }

  langBtns.forEach(btn => {
    btn.addEventListener('click', () => setLanguage(btn.dataset.lang));
  });

  /* ---- 横向滚动 & 章节导航 ---- */
  function getActivePanelIndex() {
    const scrollLeft = scrollContainer.scrollLeft;
    const panelWidth = scrollContainer.clientWidth;
    return Math.round(scrollLeft / panelWidth);
  }

  function updateNav(index) {
    navLinks.forEach((link, i) => {
      link.classList.toggle('active', i === index);
    });
  }

  function updateProgress() {
    const maxScroll = scrollContainer.scrollWidth - scrollContainer.clientWidth;
    const percent = maxScroll > 0 ? (scrollContainer.scrollLeft / maxScroll) * 100 : 0;
    progressBar.style.width = percent + '%';
  }

  function updatePanels() {
    const index = getActivePanelIndex();
    updateNav(index);

    panels.forEach((panel, i) => {
      panel.classList.toggle('in-view', i === index || Math.abs(i - index) <= 1);
    });

    updateProgress();
  }

  scrollContainer.addEventListener('scroll', updatePanels, { passive: true });

  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', inline: 'start', block: 'nearest' });
      }
    });
  });

  /* ---- 鼠标滚轮 → 横向滚动 ---- */
  scrollContainer.addEventListener('wheel', (e) => {
    if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
      e.preventDefault();
      scrollContainer.scrollLeft += e.deltaY;
    }
  }, { passive: false });

  /* ---- 触摸滑动支持 ---- */
  let touchStartX = 0;
  scrollContainer.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
  }, { passive: true });

  /* ---- 键盘导航 ---- */
  document.addEventListener('keydown', (e) => {
    const index = getActivePanelIndex();
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      if (index < panels.length - 1) {
        panels[index + 1].scrollIntoView({ behavior: 'smooth', inline: 'start' });
      }
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      if (index > 0) {
        panels[index - 1].scrollIntoView({ behavior: 'smooth', inline: 'start' });
      }
    }
  });

  /* ---- 联系表单 ---- */
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const message = document.getElementById('message').value;

      const subject = encodeURIComponent(
        currentLang === 'zh'
          ? `【飞靓杰信】来自 ${name} 的留言`
          : `[Feiliang Jiexin] Message from ${name}`
      );
      const body = encodeURIComponent(
        `${currentLang === 'zh' ? '姓名' : 'Name'}: ${name}\n${currentLang === 'zh' ? '邮箱' : 'Email'}: ${email}\n\n${message}`
      );

      window.location.href = `mailto:merilynsiangco0@gmail.com?subject=${subject}&body=${body}`;
    });
  }

  /* ---- 初始化 ---- */
  panels[0].classList.add('in-view');
  updatePanels();
})();
