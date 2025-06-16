export interface EmissionFactors {
    electricity: number; // kg CO₂ per kWh
    gas: number; // kg CO₂ per m³
    transportCar: number; // kg CO₂ per km
    publicTransport: number; // kg CO₂ per km
    flight: {
        none: number;
        shortHaul: number;
        longHaul: number;
        mixed: number;
    };
    meatMeal: number; // kg CO₂ per meal
    packagedFood: number; // kg CO₂ per item
}

export const COUNTRY_EMISSION_FACTORS: Record<string, EmissionFactors> = {
    Germany: {
        electricity: 0.40,
        gas: 2.0,
        transportCar: 0.18,
        publicTransport: 0.05,
        flight: {
            none: 0,
            shortHaul: 400,
            longHaul: 1100,
            mixed: 1600,
        },
        meatMeal: 2.5,
        packagedFood: 1.2,
    },
    Netherlands: {
        electricity: 0.35,
        gas: 2.0,
        transportCar: 0.17,
        publicTransport: 0.045,
        flight: {
            none: 0,
            shortHaul: 400,
            longHaul: 1100,
            mixed: 1600,
        },
        meatMeal: 2.4,
        packagedFood: 1.1,
    },
    Poland: {
        electricity: 0.75,
        gas: 2.1,
        transportCar: 0.20,
        publicTransport: 0.06,
        flight: {
            none: 0,
            shortHaul: 400,
            longHaul: 1100,
            mixed: 1600,
        },
        meatMeal: 2.6,
        packagedFood: 1.3,
    },
    Sweden: {
        electricity: 0.04,
        gas: 2.0,
        transportCar: 0.14,
        publicTransport: 0.03,
        flight: {
            none: 0,
            shortHaul: 400,
            longHaul: 1100,
            mixed: 1600,
        },
        meatMeal: 2.2,
        packagedFood: 1.0,
    },
    Ireland: {
        electricity: 0.30,
        gas: 2.0,
        transportCar: 0.16,
        publicTransport: 0.04,
        flight: {
            none: 0,
            shortHaul: 400,
            longHaul: 1100,
            mixed: 1600,
        },
        meatMeal: 2.3,
        packagedFood: 1.1,
    },
};
