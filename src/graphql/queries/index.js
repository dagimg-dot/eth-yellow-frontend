import GET_CATEGORIES from "./getCategories.gql";
import GET_CITIES from "./getCities.gql";
import GET_USER from "./getUser.gql";
import GET_LISTINGS from "./getListings.gql";
import GET_REVIEWS from "./getReviews.gql";
import GET_RECENT_LISTINGS from "./getRecentListings.gql";
import GET_LISTING from "./getListing.gql";
import GET_USER_LISTINGS from "@/graphql/queries/getUserBusiness.gql";
import { dynamicQuery } from "./getFilteredListings";

export {
  GET_CATEGORIES,
  GET_CITIES,
  GET_USER,
  GET_LISTINGS,
  GET_REVIEWS,
  GET_RECENT_LISTINGS,
  GET_LISTING,
  GET_USER_LISTINGS,
  dynamicQuery,
};
