export const getCompanyImageSource = (companyName: string, width?: number) =>
    companyName.length > 0 ?
        '//logo.clearbit.com/' +
        `${companyName.replace(' ', '')}.com${width ? `?size=${width}` : ''}` : '';
