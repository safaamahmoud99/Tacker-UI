import { TestBed } from '@angular/core/testing';

import { ProjectSiteAssetService } from './project-site-asset.service';

describe('ProjectSiteAssetService', () => {
  let service: ProjectSiteAssetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProjectSiteAssetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
