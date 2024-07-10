export function generatePlaceholderImage(name: string) {
  if (typeof window === 'undefined') {
    return 'https://i.pravatar.cc/150?u=a04258a2462d826712d';
  }

  const initials = name.charAt(0).toUpperCase();
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  const size = 100;
  canvas.width = size;
  canvas.height = size;

  if (context) {
    context.fillStyle = '#7C57C8'; // Background color
    context.fillRect(0, 0, size, size);

    context.fillStyle = 'white'; // Text color
    context.font = `bold ${size / 2}px Arial`;
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillText(initials, size / 2.01, size / 1.87);
  }

  return canvas.toDataURL();
}
