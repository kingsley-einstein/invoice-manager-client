import { TestBed } from '@angular/core/testing';

import { GraphqlRestService } from './graphql-rest.service';

describe('GraphqlRestService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GraphqlRestService = TestBed.get(GraphqlRestService);
    expect(service).toBeTruthy();
  });
});
