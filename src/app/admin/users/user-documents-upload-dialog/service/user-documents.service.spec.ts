import { TestBed } from '@angular/core/testing';

import { UserDocumentsService } from './user-documents.service';

describe('UserDocumentsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserDocumentsService = TestBed.get(UserDocumentsService);
    expect(service).toBeTruthy();
  });
});
