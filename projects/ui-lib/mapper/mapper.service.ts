import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BodyComponent } from '@lluc_llull/ui-lib/interfaces';
import { CDN_BASE_URL } from './cdn.token';
import { componentMappers } from './component-mappers';

@Injectable({
    providedIn: 'root',
})
export class MapperService {

    constructor(@Inject(PLATFORM_ID) private readonly platformId: Object, @Inject(CDN_BASE_URL) private readonly cdn: string) {}

    mapComponents<T>(body: any[]): BodyComponent<T>[] {
        if (!body || body.length === 0) {
            return [];
        }

        return body
            .filter((component) => component && component.name && component.props)
            .map((component) => {
                const name = component.name.toLowerCase();
                const mapper = componentMappers[name];

                const mapped: BodyComponent<T> = {
                    name,
                    order: component.order,
                    props: {} as T,
                };

                if (mapper) {
                    try {
                        mapped.props = mapper(component.props, this.cdn) as T;
                    } catch (e) {
                        console.error(`Error mapping props for component "${name}"`, e);
                    }
                } else {
                    console.warn(`No mapper found for component "${name}"`);
                }

                return mapped;
            });
    }
}
