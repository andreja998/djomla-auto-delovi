export class SearchItem {
  constructor(public name?: string) {}
}

export class Part {
  constructor(
    private id: string,
    private name: string,
    private description: string,
    private price: string,
    private mark: string,
    private model: string,
    private category: string,
    private subCategories: string[]
  ) {}
}

export function getViewport(): string {
  // https://stackoverflow.com/a/8876069
  const width = Math.max(
    document.documentElement.clientWidth,
    window.innerWidth || 0
  );
  if (width <= 576) {
    return 'xs';
  }
  if (width <= 768) {
    return 'sm';
  }
  if (width <= 992) {
    return 'md';
  }
  if (width <= 1200) {
    return 'lg';
  }

  return 'xl';
}
