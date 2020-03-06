import { DISHES } from "../resources/dishes";
import { COMMENTS } from "../resources/comments";
import { PROMOTIONS } from "../resources/promotions";
import { LEADERS } from "../resources/leaders";

export const initialState = {
  dishes: DISHES,
  comments: COMMENTS,
  promotions: PROMOTIONS,
  leaders: LEADERS
};

export const Reducer = (state = initialState, action) => {
  return state;
};
