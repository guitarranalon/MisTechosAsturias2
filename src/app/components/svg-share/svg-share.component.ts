import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-svg-share',
  templateUrl: './svg-share.component.html',
  styleUrls: ['./svg-share.component.scss'],
})
export class SvgShareComponent {
  @Input() svgSelector!: string;
  @Input() fileName = 'imagen';
  @Input() imageWidth!: number;
  @Input() imageHeight!: number;

  share() {
    let svgElement = document.querySelector(this.svgSelector) as SVGSVGElement;
    if (!svgElement) {
      console.error(
        'Elemento SVG no encontrado con el selector:',
        this.svgSelector
      );
      return;
    }

    this.inlineStyles(svgElement);
    const svgData = new XMLSerializer().serializeToString(svgElement);
    const svgBlob = new Blob([svgData], {
      type: 'image/svg+xml;charset=utf-8',
    });
    const url = URL.createObjectURL(svgBlob);

    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = this.imageWidth || svgElement.clientWidth;
      canvas.height = this.imageHeight || svgElement.clientHeight;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);

      canvas.toBlob((blob) => {
        if (!blob) return;

        if (
          navigator.share &&
          navigator.canShare?.({
            files: [
              new File([blob], `${this.fileName}.png`, { type: 'image/png' }),
            ],
          })
        ) {
          const file = new File([blob], `${this.fileName}.png`, {
            type: 'image/png',
          });
          navigator
            .share({
              title: 'Compartir progreso',
              text: 'Mi progreso en el reto de los techos de Asturias',
              files: [file],
            })
            .catch(console.error);
        } else {
          const link = document.createElement('a');
          link.download = `${this.fileName}.png`;
          link.href = URL.createObjectURL(blob);
          link.click();
        }

        URL.revokeObjectURL(url);
      }, 'image/png');
    };

    img.onerror = (err) => {
      console.error('Error al cargar SVG como imagen:', err);
    };

    img.src = url;
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
