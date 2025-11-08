const checkboxCheckedSvg = '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M16.5677 6.64017L9.56771 14.6402C9.19673 15.0853 8.50214 15.1168 8.09238 14.7071L4.09238 10.7071C3.18043 9.79514 4.59464 8.38093 5.50659 9.29288L8.73229 12.5186L15.0313 5.3598C15.8569 4.36903 17.3933 5.6494 16.5677 6.64017Z" fill="#ffffff"/></svg>';

const dotSeparatorSvg = '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 10C8 8.89543 8.89543 8 10 8C11.1046 8 12 8.89543 12 10C12 11.1046 11.1046 12 10 12C8.89543 12 8 11.1046 8 10Z" fill="currentColor"/></svg>';

export function createCardHeader(data) {
  const header = document.createElement('div');
  header.className = 'card-header';
  
  const container = document.createElement('div');
  container.className = 'card-header-container';
  
  const checkboxGroup = document.createElement('div');
  checkboxGroup.className = 'card-checkbox-group';
  
  const checkboxWrapper = document.createElement('label');
  checkboxWrapper.className = 'checkbox-wrapper';
  
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.className = 'checkbox';
  
  const checkboxIcon = document.createElement('span');
  checkboxIcon.className = 'checkbox-icon';
  checkboxIcon.innerHTML = checkboxCheckedSvg;
  
  const id = document.createElement('span');
  id.className = 'checkbox-label';
  id.textContent = data.id;
  
  checkboxWrapper.appendChild(checkbox);
  checkboxWrapper.appendChild(checkboxIcon);
  checkboxWrapper.appendChild(id);
  
  checkboxGroup.appendChild(checkboxWrapper);
  container.appendChild(checkboxGroup);
  
  if (data.release) {
    const dot = document.createElement('span');
    dot.className = 'card-dot';
    dot.innerHTML = dotSeparatorSvg;
    
    const release = document.createElement('a');
    release.href = '#';
    release.className = 'card-release';
    release.textContent = data.release;
    
    const tooltip = document.createElement('div');
    tooltip.className = 'card-release-tooltip';
    tooltip.textContent = 'Milestone';
    document.body.appendChild(tooltip);
    
    let tooltipTimeout;
    
    const updateTooltipPosition = () => {
      const rect = release.getBoundingClientRect();
      tooltip.style.left = `${rect.left + rect.width / 2}px`;
      tooltip.style.top = `${rect.top - 8}px`;
      tooltip.style.transform = 'translate(-50%, -100%)';
    };
    
    release.addEventListener('mouseenter', () => {
      tooltipTimeout = setTimeout(() => {
        updateTooltipPosition();
        tooltip.classList.add('card-release-tooltip-visible');
      }, 400);
    });
    
    release.addEventListener('mouseleave', () => {
      clearTimeout(tooltipTimeout);
      tooltip.classList.remove('card-release-tooltip-visible');
    });
    
    release.addEventListener('mousemove', () => {
      if (tooltip.classList.contains('card-release-tooltip-visible')) {
        updateTooltipPosition();
      }
    });
    
    container.appendChild(dot);
    container.appendChild(release);
  }
  
  header.appendChild(container);
  return header;
}

