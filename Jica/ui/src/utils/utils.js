const styles = window.getComputedStyle(document.body);

const colors = {
  "primary-color": styles.getPropertyValue('--primary-color'),
  "secondary-color": styles.getPropertyValue('--secondary-color'),
  "tertiary-color": styles.getPropertyValue('--tertiary-color'),
  "color-four": styles.getPropertyValue('--color-four'),
  "color-five": styles.getPropertyValue('--color-five')
}


export  { colors };
