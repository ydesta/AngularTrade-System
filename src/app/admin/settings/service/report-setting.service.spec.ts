import { TestBed } from '@angular/core/testing';

import { ReportSettingService } from './report-setting.service';

describe('ReportSettingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ReportSettingService = TestBed.get(ReportSettingService);
    expect(service).toBeTruthy();
  });
});
