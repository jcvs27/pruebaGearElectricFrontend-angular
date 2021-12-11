import { TestBed } from '@angular/core/testing';

import { ServicioAlertService } from './servicio-alert.service';

describe('ServicioAlertService', () => {
  let service: ServicioAlertService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicioAlertService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
