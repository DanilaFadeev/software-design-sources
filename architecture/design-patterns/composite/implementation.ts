interface IComponent {
  operation(): void;
}

class Leaf implements IComponent {

  constructor(private name: string) {}

  public operation() {
    console.log(`${this.name}: operation called`);
  }
}

class Compositor implements IComponent {
  private components: IComponent[] = [];

  public add(component: IComponent): void {
    this.components.push(component);
  }

  public remove(component: IComponent): void {
    this.components = this.components.filter(c => c !== component);
  }

  public getChildren(): IComponent[] {
    return this.components;
  }

  public operation(): void {
    for (const component of this.components) {
      component.operation();
    }
  }
}

const rootCompositor = new Compositor();
const childCompositor = new Compositor();

const rootCompositorLeaf = new Leaf('Root');
const childCompositorLeaf1 = new Leaf('Child1');
const childCompositorLeaf2 = new Leaf('Child2');

rootCompositor.add(childCompositor);
rootCompositor.add(rootCompositorLeaf);

childCompositor.add(childCompositorLeaf1);
childCompositor.add(childCompositorLeaf2);

rootCompositor.operation();
