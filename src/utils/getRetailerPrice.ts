import Offer from "../types/offer";

const getRetailerPrice = (offers: Offer[], retailer: string): number => {
    const { price } = offers.find(offer => offer.retailer.includes(retailer));

    if (price) {
        return Number(price);
    }

    return 0;
};

export default getRetailerPrice;
