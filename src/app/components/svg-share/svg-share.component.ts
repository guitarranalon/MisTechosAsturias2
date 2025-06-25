import { Component, Input, OnDestroy } from '@angular/core';

interface ShareData {
  title: string;
  text: string;
}

interface ImageDimensions {
  width: number;
  height: number;
}

@Component({
  selector: 'app-svg-share',
  templateUrl: './svg-share.component.html',
  styleUrls: ['./svg-share.component.scss'],
})
export class SvgShareComponent {
  @Input() svgSelector!: string;
  @Input() fileName = 'imagen';
  @Input() shareTitle = 'Compartir progreso';
  @Input() shareText = 'Mi progreso en el reto de los techos de Asturias';

  private readonly DEFAULT_IMAGE_TYPE = 'image/png';
  private readonly SVG_MIME_TYPE = 'image/svg+xml;charset=utf-8';
  private readonly backgroundColor = '#fff';
  private readonly urlText =
    'https://guitarranalon.github.io/MisTechosAsturias2';
  private readonly urlFontSize = 14;
  private readonly urlColor = '#888';
  private readonly imageTitleText = 'Mis techos de Asturias';
  private readonly imageTitleColor = '#333';
  private readonly titleFontSize = 20;
  private createdUrls: string[] = [];

  ngOnDestroy(): void {
    this.cleanupUrls();
  }

  private cleanupUrls(): void {
    this.createdUrls.forEach((url) => URL.revokeObjectURL(url));
    this.createdUrls = [];
  }

  async share(): Promise<void> {
    try {
      const svgElement = this.getSvgElement();
      const canvas = await this.convertSvgToCanvas(svgElement);
      const blob = await this.canvasToBlob(canvas);

      await this.handleShare(blob);
    } catch (error) {
      console.error('Error al compartir la imagen:', error);
    }
  }

  private getSvgElement(): SVGSVGElement {
    const svgElement = document.querySelector(
      this.svgSelector
    ) as SVGSVGElement;

    if (!svgElement) {
      throw new Error(
        `Elemento SVG no encontrado con el selector: ${this.svgSelector}`
      );
    }

    return svgElement;
  }

  private async convertSvgToCanvas(
    svgElement: SVGSVGElement
  ): Promise<HTMLCanvasElement> {
    this.inlineStyles(svgElement);

    const svgData = new XMLSerializer().serializeToString(svgElement);
    const svgBlob = new Blob([svgData], { type: this.SVG_MIME_TYPE });
    const url = URL.createObjectURL(svgBlob);
    this.createdUrls.push(url);

    const img = await this.loadImage(url);
    const dimensions = this.getImageDimensions(svgElement);

    return this.createCanvas(img, dimensions);
  }

  private loadImage(src: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      const img = new Image();

      img.onload = () => resolve(img);
      img.onerror = (error) =>
        reject(new Error(`Error al cargar SVG como imagen: ${error}`));

      img.src = src;
    });
  }

  private getImageDimensions(svgElement: SVGSVGElement): ImageDimensions {
    const width =
      this.getAttributeAsNumber(svgElement, 'width') ||
      svgElement.clientWidth ||
      800;

    const height =
      this.getAttributeAsNumber(svgElement, 'height') ||
      svgElement.clientHeight ||
      600;

    return { width, height };
  }

  private getAttributeAsNumber(
    element: SVGSVGElement,
    attribute: string
  ): number | null {
    const value = element.getAttribute(attribute);
    if (!value) return null;

    const numericValue = parseFloat(value.replace(/[^\d.-]/g, ''));
    return isNaN(numericValue) ? null : numericValue;
  }

  private createCanvas(
    img: HTMLImageElement,
    dimensions: ImageDimensions
  ): HTMLCanvasElement {
    const canvas = document.createElement('canvas');
    canvas.width = dimensions.width;
    canvas.height = dimensions.height;

    const ctx = canvas.getContext('2d');
    if (!ctx) {
      throw new Error('No se pudo obtener el contexto 2D del canvas');
    }

    ctx.fillStyle = this.backgroundColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

    this.drawTitle(ctx, dimensions);
    this.drawUrlText(ctx, dimensions);

    return canvas;
  }

  private drawTitle(
    ctx: CanvasRenderingContext2D,
    dimensions: ImageDimensions
  ): void {
    const yPosition = dimensions.height - 40;

    ctx.fillStyle = this.imageTitleColor;
    ctx.font = `${this.titleFontSize}px playfair, Arial, sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'bottom';

    ctx.fillText(this.imageTitleText, dimensions.width / 2, yPosition);
  }

  private drawUrlText(
    ctx: CanvasRenderingContext2D,
    dimensions: ImageDimensions
  ): void {
    const url = this.urlText || window.location.href;
    const yPosition = dimensions.height - 20;

    ctx.fillStyle = this.urlColor;
    ctx.font = `${this.urlFontSize}px fauna, Arial, sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'bottom';

    ctx.fillText(url, dimensions.width / 2, yPosition);
  }

  private canvasToBlob(canvas: HTMLCanvasElement): Promise<Blob> {
    return new Promise((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (blob) {
          resolve(blob);
        } else {
          reject(new Error('Error al convertir canvas a blob'));
        }
      }, this.DEFAULT_IMAGE_TYPE);
    });
  }

  private async handleShare(blob: Blob): Promise<void> {
    const file = new File([blob], `${this.fileName}.png`, {
      type: this.DEFAULT_IMAGE_TYPE,
    });

    if (this.canUseNativeShare(file)) {
      await this.nativeShare(file);
    } else {
      this.downloadFile(blob);
    }
  }

  private canUseNativeShare(file: File): boolean {
    return (
      'share' in navigator &&
      'canShare' in navigator &&
      typeof navigator.canShare === 'function' &&
      navigator.canShare({ files: [file] })
    );
  }

  private async nativeShare(file: File): Promise<void> {
    const shareData: ShareData = {
      title: this.shareTitle,
      text: this.shareText,
    };

    await navigator.share({
      ...shareData,
      files: [file],
    });
  }

  private downloadFile(blob: Blob): void {
    const url = URL.createObjectURL(blob);
    this.createdUrls.push(url);

    const link = document.createElement('a');
    link.download = `${this.fileName}.png`;
    link.href = url;
    link.click();
  }

  private inlineStyles(svg: SVGSVGElement) {
    const allPaths = svg.querySelectorAll('path');

    allPaths.forEach((path) => {
      const computed = window.getComputedStyle(path);
      const style = path.getAttribute('style') || '';

      path.setAttribute(
        'style',
        style +
          `
        fill: ${computed.fill};
        stroke: ${computed.stroke};
        stroke-width: ${computed.strokeWidth};
        font-size: ${computed.fontSize};
        `
      );
    });
  }
}
