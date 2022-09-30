import { Injectable } from '@angular/core';

export class Region {
    public RegionId: string;
    public Description: string;
    public DescriptionEnglish: string;

  }

export class Zone {
    public ZoneId: string;
    public isNew: boolean;
    public RegionId: string;
    public Description: string;
    public DescriptionEnglish: string;
    public Region?: Region;

  }

export class Woreda {
    public RegionId: string;
    public ZoneId: string;
    public WoredaId: string;
    public isNew: boolean;
    public Description: string;
    public DescriptionEnglish: string;
    public Region: Region;
    public Zone: Zone;

  }

export class Kebele {
    public RegionId: string;
    public ZoneId: string;
    public KebeleId: string;
    public WoredaId: string;
    public Description: string;
    public DescriptionEnglish: string;
    public Region: Region;
    public Zone: Zone;
    public Woreda: Woreda;
  }

export class AddressModel {
  public RegionId: number;
  public ZoneId: number;
  public KebeleId: number;
  public WoredaId: number;
  public Email: string;
  public Fax: string;
  public Pobox: string;
  public Tel: string;
  public MobileNo: string;
  public HouseNo: string;
}


