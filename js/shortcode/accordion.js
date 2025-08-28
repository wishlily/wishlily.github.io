document.addEventListener('DOMContentLoaded', function() {
    // 所有手风琴项
    const accordionItems = document.querySelectorAll('.accordion-item');

    // 点击手风琴头部
    accordionItems.forEach(item => {
        const header = item.querySelector('.accordion-header');

        header.addEventListener('click', function() {
            // 如果点击的是当前激活项，则收起
            if (item.classList.contains('active')) {
                item.classList.remove('active');
                return;
            }

            // 收起所有其他项
            accordionItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });

            // 展开当前项
            item.classList.add('active');
        });
    });

    // 技能标签点击功能
    const skillTags = document.querySelectorAll('.skill-tag');
    const modal = document.getElementById('skillModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalBody = document.getElementById('modalBody');
    const closeBtn = document.getElementById('closeModal');

    skillTags.forEach(tag => {
        tag.addEventListener('click', function(e) {
            e.stopPropagation();

            // 动画效果
            this.style.animation = 'pulse 0.5s ease';

            // 获取技能数据
            const title = this.getAttribute('data-title');
            const details = JSON.parse(this.getAttribute('data-details'));

            // 更新模态框内容
            modalTitle.textContent = title;
            modalBody.innerHTML = renderSkillDetails(details);

            // 显示模态框
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';

            // 动画结束后清除
            setTimeout(() => {
                this.style.animation = '';
            }, 500);
        });
    });

    // 关闭模态框
    closeBtn.addEventListener('click', function() {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    });

    // 点击模态框背景关闭
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });

    // ESC键关闭模态框
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });

    // 渲染技能详情HTML
    function renderSkillDetails(details) {
        let html = '<div class="skill-details">';
        
        // 只有当description不为空时才显示技能描述部分
        if (details.description && details.description.trim() !== '') {
            html += `
                <div class="detail-item">
                    <div class="detail-label">
                        <i class="fas fa-info-circle"></i>
                        技能描述
                    </div>
                    <div class="detail-value">${details.description}</div>
                </div>
            `;
        }
        
        // 只有当skills数组存在且不为空时才显示核心技能部分
        if (details.skills && Array.isArray(details.skills) && details.skills.length > 0) {
            html += `
                <div class="detail-item">
                    <div class="detail-label">
                        <i class="fas fa-tools"></i>
                        核心技能
                    </div>
                    <div class="detail-value">
                        <ul>
                            ${details.skills.map(skill => `<li>${skill}</li>`).join('')}
                        </ul>
                    </div>
                </div>
            `;
        }
        
        // 只有当experience不为空时才显示经验年限部分
        if (details.experience && details.experience.trim() !== '') {
            html += `
                <div class="detail-item">
                    <div class="detail-label">
                        <i class="fas fa-clock"></i>
                        经验年限
                    </div>
                    <div class="detail-value">${details.experience}</div>
                </div>
            `;
        }
        
        // 只有当projects数组存在且不为空时才显示相关项目部分
        if (details.projects && Array.isArray(details.projects) && details.projects.length > 0) {
            html += `
                <div class="detail-item">
                    <div class="detail-label">
                        <i class="fas fa-project-diagram"></i>
                        相关项目
                    </div>
                    <div class="detail-value">
                        <ul>
                            ${details.projects.map(project => `<li>${project}</li>`).join('')}
                        </ul>
                    </div>
                </div>
            `;
        }
        
        html += '</div>';
        return html;
    }
});