import {
    ADD_FAVORITE,
    DELETE_FAVORITE,
    FAVORITES_LOADED_FAIL,
    FAVORITES_LOADED_SUCCESS,
    FAVORITE_CLICK,
    FAVORITE_CLICK_HOME,
} from "../contexts/constants";

export const favoriteReducer = (state, action) => {
    const { type, payload } = action;

    switch (type) {
        case ADD_FAVORITE:
            return {
                ...state,
                favorites: [...state.favorites, payload],
            };

            // case FAVORITE_CLICK:
            //     return {...state, favorite: payload };

            // case FAVORITE_CLICK_HOME:
            //     return {
            //         ...state,
            //         favoriteHome: payload,
            //         favoritesLoading: true,
            //     };

        case DELETE_FAVORITE:
            return {
                ...state,
                favorites: state.favorites.filter(
                    (favorite) => favorite._id !== payload
                ),
            };
        case FAVORITES_LOADED_SUCCESS:
            return {
                ...state,
                favorites: payload,
                favoritesLoading: false,
            };

        case FAVORITES_LOADED_FAIL:
            return {
                ...state,
                favorites: [],
                favoritesLoading: false,
            };

        default:
            return state;
    }
};