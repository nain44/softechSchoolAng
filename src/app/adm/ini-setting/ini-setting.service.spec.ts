import { TestBed } from '@angular/core/testing';

import { IniSettingService } from './ini-setting.service';

describe('IniSettingService', () => {
  let service: IniSettingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IniSettingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
