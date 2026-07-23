import { DOCUMENT, inject, Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRouteSnapshot, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import {
  GITHUB_REPO_URL,
  OG_IMAGE_URL,
  SITE_DESCRIPTION,
  SITE_KEYWORDS,
  SITE_NAME,
  SITE_URL,
  type SeoRouteData,
} from './site';

@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly router = inject(Router);
  private readonly document = inject(DOCUMENT);

  /** Start listening to router navigations and apply SEO tags. */
  init(): void {
    this.apply({
      title: SITE_NAME,
      description: SITE_DESCRIPTION,
    });

    this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe(() => {
        const data = this.collectRouteData(this.router.routerState.snapshot.root);
        this.apply(data, this.router.url);
      });
  }

  apply(data: SeoRouteData, path = '/'): void {
    const pageTitle = data.title?.trim() || SITE_NAME;
    const fullTitle =
      pageTitle === SITE_NAME ? SITE_NAME : `${pageTitle} · ${SITE_NAME}`;
    const description = data.description?.trim() || SITE_DESCRIPTION;
    const canonical = this.toAbsoluteUrl(path);
    const robots = data.noIndex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large';

    this.title.setTitle(fullTitle);

    this.meta.updateTag({ name: 'description', content: description });
    this.meta.updateTag({ name: 'keywords', content: SITE_KEYWORDS });
    this.meta.updateTag({ name: 'robots', content: robots });
    this.meta.updateTag({ name: 'googlebot', content: robots });

    this.meta.updateTag({ property: 'og:title', content: fullTitle });
    this.meta.updateTag({ property: 'og:description', content: description });
    this.meta.updateTag({ property: 'og:url', content: canonical });
    this.meta.updateTag({ property: 'og:image', content: OG_IMAGE_URL });
    this.meta.updateTag({ property: 'og:type', content: 'website' });
    this.meta.updateTag({ property: 'og:site_name', content: 'Base UI' });

    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:title', content: fullTitle });
    this.meta.updateTag({ name: 'twitter:description', content: description });
    this.meta.updateTag({ name: 'twitter:image', content: OG_IMAGE_URL });

    this.setCanonical(canonical);
    this.setJsonLd(this.buildGraph(fullTitle, description, canonical));
  }

  private collectRouteData(route: ActivatedRouteSnapshot): SeoRouteData {
    let current: ActivatedRouteSnapshot | null = route;
    let data: SeoRouteData = {};

    while (current) {
      const seo = (current.data?.['seo'] ?? {}) as SeoRouteData;
      const title = current.title || seo.title;
      data = {
        ...data,
        ...seo,
        ...(title ? { title } : {}),
      };
      current = current.firstChild;
    }

    return data;
  }

  private toAbsoluteUrl(path: string): string {
    const clean = path.split('?')[0].split('#')[0];
    if (!clean || clean === '/') {
      return `${SITE_URL}/`;
    }
    return `${SITE_URL}${clean.startsWith('/') ? clean : `/${clean}`}`;
  }

  private setCanonical(url: string): void {
    let link = this.document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = this.document.createElement('link');
      link.setAttribute('rel', 'canonical');
      this.document.head.appendChild(link);
    }
    link.setAttribute('href', url);
  }

  private setJsonLd(graph: Record<string, unknown>): void {
    const id = 'app-seo-jsonld';
    let script = this.document.getElementById(id) as HTMLScriptElement | null;
    if (!script) {
      script = this.document.createElement('script');
      script.id = id;
      script.type = 'application/ld+json';
      this.document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(graph);
  }

  private buildGraph(title: string, description: string, url: string): Record<string, unknown> {
    return {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'WebSite',
          '@id': `${SITE_URL}/#website`,
          url: SITE_URL,
          name: SITE_NAME,
          description: SITE_DESCRIPTION,
          publisher: { '@id': `${SITE_URL}/#organization` },
          inLanguage: 'en',
        },
        {
          '@type': 'Organization',
          '@id': `${SITE_URL}/#organization`,
          name: 'Base UI',
          url: 'https://base-ui.net',
          sameAs: [GITHUB_REPO_URL, 'https://base-ui.net'],
        },
        {
          '@type': 'SoftwareApplication',
          '@id': `${SITE_URL}/#app`,
          name: SITE_NAME,
          applicationCategory: 'DeveloperApplication',
          operatingSystem: 'Web',
          url: SITE_URL,
          image: OG_IMAGE_URL,
          description: SITE_DESCRIPTION,
          offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'USD',
          },
          author: { '@id': `${SITE_URL}/#organization` },
          codeRepository: GITHUB_REPO_URL,
          programmingLanguage: ['TypeScript', 'HTML', 'CSS'],
          keywords: [
            'Angular',
            'Tailwind CSS',
            'dashboard template',
            'Base UI',
            'admin panel',
            'free',
          ],
        },
        {
          '@type': 'WebPage',
          '@id': `${url}#webpage`,
          url,
          name: title,
          description,
          isPartOf: { '@id': `${SITE_URL}/#website` },
          primaryImageOfPage: OG_IMAGE_URL,
          about: { '@id': `${SITE_URL}/#app` },
        },
        {
          '@type': 'FAQPage',
          '@id': `${SITE_URL}/#faq`,
          mainEntity: [
            {
              '@type': 'Question',
              name: 'What is Base UI Free Dashboard?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'A free open-source Angular 22 admin dashboard template styled with Tailwind CSS 4 and built with Base UI free-tier components. It includes mock auth, an app shell, demo pages, and a live component gallery.',
              },
            },
            {
              '@type': 'Question',
              name: 'Is the dashboard free to use?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Yes. The dashboard template is free to use in your projects. Base UI free-tier components are free for unlimited projects; Pro components require a Base UI license.',
              },
            },
            {
              '@type': 'Question',
              name: 'How do I run the demo locally?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Clone the GitHub repository, run npm install, then npm start. Open http://localhost:4200 and sign in with demo@base-ui.net / password (auth is mocked).',
              },
            },
            {
              '@type': 'Question',
              name: 'Where is the source code?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: `The source is on GitHub at ${GITHUB_REPO_URL}. Component docs and pricing are at https://base-ui.net.`,
              },
            },
          ],
        },
      ],
    };
  }
}
