export interface IProduct {
  id: string;
  productType: {
    typeId: string;
    id: string;
  };
  masterData: {
    current: {
      name: {
        'en-US': string;
        'en-GB': string;
        'de-DE': string;
      };
      description: {
        'en-US': string;
        'en-GB': string;
        'de-DE': string;
      };
      categories: {
        typeId: string;
        id: string;
      }[];
      categoryOrderHints: { [key: string]: string };
    };
  };
  masterVariant: {
    id: string;
    prices: [
      {
        id: string;
        value: {
          type: 'centPrecision';
          currencyCode: 'EUR';
          centAmount: number;
          fractionDigits: number;
        };
        country: string;
        discounted: {
          value: {
            type: 'centPrecision';
            currencyCode: string;
            centAmount: number;
            fractionDigits: number;
          };
          discount: {
            typeId: 'product-discount';
            id: string;
          };
        };
      },
    ];

    images: [
      {
        url: string;
      },
    ];
    availability: {
      isOnStock: boolean;
      availableQuantity: number;
      version: number;
      id: string;
    };
  };
  key: string;
  taxCategory: {
    typeId: 'tax-category';
    id: string;
  };
}

export interface IProducts {
  products: IProduct[];
}

export interface IFetchProductSuccess {}
