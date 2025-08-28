// Timeline shortcode JavaScript functionality
document.addEventListener('DOMContentLoaded', function() {
  const timelineItems = document.querySelectorAll('.timeline-item');

  function checkVisibility() {
    timelineItems.forEach(item => {
      const position = item.getBoundingClientRect();

      // 如果元素在视口中
      if(position.top < window.innerHeight - 100) {
        item.classList.add('visible');
      }
    });
  }

  // 初始检查
  checkVisibility();

  // 滚动时检查
  window.addEventListener('scroll', checkVisibility);
});
