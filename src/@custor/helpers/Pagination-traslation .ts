import { MatPaginatorIntl } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';

export class PaginationTraslation {

  constructor(private readonly translate: TranslateService) {}

  getPaginatorIntl(): MatPaginatorIntl {
    const paginatorIntl = new MatPaginatorIntl();
    paginatorIntl.itemsPerPageLabel = this.translate.instant('Paging.ItemsPerPageLabel');
    paginatorIntl.nextPageLabel = this.translate.instant('Paging.NextPageLabel');
    paginatorIntl.previousPageLabel = this.translate.instant('Paging.PreviousPageLabel');
    paginatorIntl.firstPageLabel = this.translate.instant('Paging.FirstPageLabel');
    paginatorIntl.lastPageLabel = this.translate.instant('Paging.LastPageLabel');
    paginatorIntl.getRangeLabel = this.getRangeLabel.bind(this);
    return paginatorIntl;
  }

  private getRangeLabel(page: number, pageSize: number, length: number): string {
    if (length === 0 || pageSize === 0) {
      return this.translate.instant('Paging.RangePageLabel', { length });
    }
    length = Math.max(length, 0);
    const startIndex = page * pageSize;
    const endIndex = startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize;
    return this.translate.instant('Paging.RangePageLabel2', { startIndex: startIndex + 1, endIndex, length });
  }
}
