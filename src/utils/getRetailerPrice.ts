import Offer from "../types/offer";

const getRetailerPrice = (offers: Offer[] = [], retailer: string): number => {
    const offer = offers.find(offer => offer.retailer.includes(retailer));

    if (offer && offer.price) {
        return Number(offer.price);
    }

    return 0;
};

export default getRetailerPrice;
