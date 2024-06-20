import { Data } from '@/types/data';

export function CalculateScopes(data: []) {
  //data.map((ite) => console.log(ite.scope1))
  let scope1 = data.reduce((accumulateur, element) => accumulateur + (element.scope1 ?? 0), 0);
  console.log('scope 1' + scope1);
  let scope2 = data.reduce((accumulateur, element) => accumulateur + (element.scope2 ?? 0), 0);
  let scope3 = data.reduce((accumulateur, element) => accumulateur + (element.scope3 ?? 0), 0);
  const sum = parseInt(scope1 + scope2 + scope3);
  const sumPr = 100 / sum;
  scope1 = scope1 * sumPr;
  scope2 = scope2 * sumPr;
  scope3 = scope3 * sumPr;
  return { scope1, scope2, scope3, sum };
}

export function CalculateEmission(data: []) {
  let totalEmission = data.reduce(
    (accumulateur, element) => accumulateur + ((element.emission_tracker && parseFloat(element.emission_tracker)) ?? 0),
    0
  );
  return parseInt(totalEmission);
}
export function extractScops(data: []) {
  const scope1Arr = data.map((element) => element.scope1 ?? 0);
  const scope2Arr = data.map((element) => element.scope2 ?? 0);
  const scope3Arr = data.map((element) => element.scope3 ?? 0);
  return { scope1Arr, scope2Arr, scope3Arr };
}

export function getCarbonEmissionByCategory(data: []) {
  const extractedData = data.map((item) => ({
    category: item.category,
    emission_tracker: (item.emission_tracker && parseInt(item.emission_tracker)) ?? 0,
  }));

  const summedData = extractedData.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = 0;
    }
    acc[item.category] += item.emission_tracker;
    return acc;
  }, {});

  // Step 3: Transform the summed data into the desired format
  const result = Object.entries(summedData).map(([category, value]) => ({
    label: category,
    value,
  }));

  return result;
}


export function getCarbonEmission(data: []) {

  return data.map( item => {
    return item.emission_tracker ;
  });
}

export function getCarbonEmissionFromTarget(data: []) {

  return data.map( item => {
    console.log(item.emissionReduction)
    return item.emissionReduction ;
  });
}
export const isEmpty = (obj: any) => {
  return Object.keys(obj).length === 0 || Object.values(obj).every((value) => !value);
};
export const isEmptyArray = (array: any) => {
  return array.every((item) => {
    // Check for different empty values
    return (
      item === '' ||
      item === null ||
      item === undefined ||
      (typeof item === 'string' && item.trim() === '') ||
      item === false
    );
  });
};
export const FilterEmptyRow = (data: []) => {
  return data.filter((item) => !isEmpty(item));
};

export const ContainKey = (obj: object, key: string) => {
  return key in obj;
};

export const HasAllKeys = (obj: object, keys: string[]) => {
  for (let key of keys) {
    if (!obj.hasOwnProperty(key)) {
      return false;
    }
  }
  return true;
};

export const calculateDATA = (data: Data[], date, category, location) => {
  const result = data.find((element) => {
    if (
      element.date == date &&
      element.category == category &&
      element.location == location &&
      element.source !== 'Bulk Upload'
    ) {
      return true; // This will cause `find` to return this element
    }
    return false;
  });
  // console.log('result==> '+ JSON.stringify(result.emission_tracker))
  return result
    ? {
        emission_tracker: result.emission_tracker,
        scope1: result.scope1,
        scope2: result.scope2,
        scope3: result.scope3,
      }
    : {
      emission_tracker: 0,
      scope1:0,
      scope2:0,
      scope3: 0,
    };
};
