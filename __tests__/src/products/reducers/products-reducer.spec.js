import configureMockStore from "redux-mock-store";
import ProductsReducer from 'src/products/reducers/products-reducer.js';

describe("Products Reducer functionality test", () => {

    let initialState = {
        isLoading: false,
        isError: false,
        sortBy: "id",
        hasMore: true,
        page: 0,
        limit: 15,
        data: {}
    };
    let queryParams = {
        page: 0,
        sortBy: 'id',
        limit: 15
    };

    it("should retun the initial state", () => {
        expect(ProductsReducer(undefined/*state undefined*/, {}))
            .toEqual(initialState);
    });

    it("should clear all existing data when 'SUBMIT_GET_PRODUCTS' action is called", () => {
        let expectedState = {
            isLoading: true,
            isError: false,
            sortBy: "id",
            hasMore: true,
            page: 0,
            limit: 15,
            data: {}
        };

        expect(ProductsReducer(initialState, {
            type: 'SUBMIT_GET_PRODUCTS',
            params: queryParams
        }))
            .toEqual(expectedState);
    });

    it("should return new data when 'FINISH_GET_PRODUCTS' action is called", () => {
        let expectedState = {
            isLoading: false,
            isError: false,
            sortBy: "id",
            hasMore: true,
            page: 0,
            limit: 15,
            data: {
                "0": [{
                    face: 'abcd',
                    id: "567",
                    size: 30
                }]
            }
        };

        expect(ProductsReducer(initialState, {
            type: 'FINISH_GET_PRODUCTS',
            params: queryParams,
            data: [{
                face: 'abcd',
                id: "567",
                size: 30
            }]
        }))
            .toEqual(expectedState);
    });

    it("should return data with concatenation to existing data when 'FINISH_GET_PRODUCTS' action is called", () => {
        let currentState = {
            isLoading: true,
            isError: false,
            sortBy: "id",
            hasMore: true,
            page: 0,
            limit: 15,
            data: {
                "0": [{
                    face: 'abcd',
                    id: "567",
                    size: 30
                }]
            }
        };

        let expectedState = {
            isLoading: false,
            isError: false,
            sortBy: "id",
            hasMore: false, /*incoming data is less then 14 set to false */
            page: 1,
            limit: 15,
            data: {
                "0": [{
                    face: 'abcd',
                    id: "567",
                    size: 30
                }],
                "1": [
                    {
                        face: 'hello',
                        id: "777",
                        size: 50
                    }
                ]
            }
        };

        let newStubData = [{
            face: 'hello',
            id: "777",
            size: 50
        }];

        let _queryParams = {
            page: 1,
            sortBy: 'id',
            limit: 15
        }
        
        expect(ProductsReducer(currentState, {
            type: 'FINISH_GET_PRODUCTS',
            params: _queryParams,
            data: newStubData
        }))
            .toEqual(expectedState);
    });

    it("should return data with concatenation to existing data and hasMore field to true when 'FINISH_GET_PRODUCTS' action is called", () => {
        let initialProduct ={
            "0":  [{
                face: 'abcd',
                id: "567",
                size: 30
            }]
        }
        let _queryParams = {
            page: 1,
            sortBy: 'id',
            limit: 15
        }
        
        let currentState = {
            isLoading: true,
            isError: false,
            sortBy: "id",
            hasMore: true,
            page: 1,
            limit: 15,
            data: initialProduct
        };

        let expectedProducts = {
            "0":  [{
                face: 'abcd',
                id: "567",
                size: 30
            }],
            "1": productsStubData
        };
        
        let expectedState = {
            isLoading: false,
            isError: false,
            sortBy: "id",
            hasMore: true, /*incoming data is less then 14 set to false */
            page: 1,
            limit: 15,
            data: expectedProducts
        };

        expect(ProductsReducer(currentState, {
            type: 'FINISH_GET_PRODUCTS',
            params: _queryParams,
            data: productsStubData
        }))
            .toEqual(expectedState);
    });

    it("should return the correct sort type by Size with 'SORT_BY_SELECTION_CHANGED' action is called", () => {
        let expectedState = {
            isLoading: false,
            isError: false,
            sortBy: "size",
            hasMore: true,
            page: 0,
            limit: 15,
            data: {}
        };

        expect(ProductsReducer(initialState, {
            type: 'SORT_BY_SELECTION_CHANGED',
            sortBy: 'size'
        }))
            .toEqual(expectedState);
    });

    it("should return the correct sort type by PRICE with 'SORT_BY_SELECTION_CHANGED' action is called", () => {
        let expectedState = {
            isLoading: false,
            isError: false,
            sortBy: "price",
            hasMore: true,
            page: 0,
            limit: 15,
            data: {}
        };

        expect(ProductsReducer(initialState, {
            type: 'SORT_BY_SELECTION_CHANGED',
            sortBy: 'price'
        }))
            .toEqual(expectedState);
    });

    it("should return the default sorty by 'id' when incorrect sort supplied with 'SORT_BY_SELECTION_CHANGED' action is called", () => {
        let currentState = {
            isLoading: false,
            isError: false,
            sortBy: "id",
            hasMore: true,
            page: 0,
            limit: 15,
            data: {}
        };

        let expectedState = {
            isLoading: false,
            isError: false,
            sortBy: "id",
            hasMore: true,
            page: 0,
            limit: 15,
            data: {}
        };

        expect(ProductsReducer(currentState, {
            type: 'SORT_BY_SELECTION_CHANGED',
            sortBy: 'random'
        }))
            .toEqual(expectedState);
    });

    it("should return the error is true when 'ERROR_GET_PRODUCTS' action is called", () => {
        let expectedState = {
            isLoading: false,
            isError: true,
            sortBy: "id",
            hasMore: true,
            page: 0,
            limit: 15,
            data: {}
        };

        expect(ProductsReducer(initialState, {
            type: 'ERROR_GET_PRODUCTS',
            error: new Error("api error")
        }))
            .toEqual(expectedState);
    });

});

const productsStubData = [
    {
        "id": "5767-hzvppchspmejrnpe84qzx5hfr",
        "size": 30,
        "price": 235,
        "face": "( .-. )",
        "date": "Tue Feb 06 2018 08:38:03 GMT+1300 (New Zealand Daylight Time)"
    },
    {
        "id": "63048-v5me8lgb9ufflcu57fh66flxr",
        "size": 37,
        "price": 266,
        "face": "( .o.)",
        "date": "Sun Jan 28 2018 07:52:27 GMT+1300 (New Zealand Daylight Time)"
    },
    {
        "id": "50688-ofk31qc4i1w2jl9inkv9m5cdi",
        "size": 31,
        "price": 208,
        "face": "( `·´ )",
        "date": "Fri Feb 02 2018 12:24:17 GMT+1300 (New Zealand Daylight Time)"
    },
    {
        "id": "29979-e6n2y9rmj5zxk9y6z4r34hd7vi",
        "size": 15,
        "price": 719,
        "face": "( ° ͜ ʖ °)",
        "date": "Sun Feb 04 2018 01:31:14 GMT+1300 (New Zealand Daylight Time)"
    },
    {
        "id": "922-7w1l1wejhnszsh5c8l00h33di",
        "size": 38,
        "price": 593,
        "face": "( ͡° ͜ʖ ͡°)",
        "date": "Wed Jan 31 2018 22:49:01 GMT+1300 (New Zealand Daylight Time)"
    },
    {
        "id": "16483-zjgtx9wmkknc69m5xsrpsc3di",
        "size": 37,
        "price": 990,
        "face": "( ⚆ _ ⚆ )",
        "date": "Thu Feb 08 2018 02:07:04 GMT+1300 (New Zealand Daylight Time)"
    },
    {
        "id": "58186-tpmmlpwufm1pszjr31t9be29",
        "size": 24,
        "price": 28,
        "face": "( ︶︿︶)",
        "date": "Sun Feb 04 2018 08:47:46 GMT+1300 (New Zealand Daylight Time)"
    },
    {
        "id": "2724-m8x53hgg5ufbit1s1cel5l8fr",
        "size": 34,
        "price": 484,
        "face": "( ﾟヮﾟ)",
        "date": "Sun Jan 28 2018 03:32:43 GMT+1300 (New Zealand Daylight Time)"
    },
    {
        "id": "4369-jcj4ms5cna7o754yu9tem6lxr",
        "size": 34,
        "price": 211,
        "face": "(\\/)(°,,,°)(\\/)",
        "date": "Wed Feb 07 2018 19:20:08 GMT+1300 (New Zealand Daylight Time)"
    },
    {
        "id": "458-x022kxjl9hzv6vbzc03blnmi",
        "size": 27,
        "price": 5,
        "face": "(¬_¬)",
        "date": "Thu Feb 08 2018 06:49:54 GMT+1300 (New Zealand Daylight Time)"
    },
    {
        "id": "15779-8fm3giartyr7jgqaehdsiqkt9",
        "size": 31,
        "price": 95,
        "face": "(¬º-°)¬",
        "date": "Sun Jan 28 2018 00:30:40 GMT+1300 (New Zealand Daylight Time)"
    },
    {
        "id": "38628-5oqlbgg47s05knwn172uyxpqfr",
        "size": 35,
        "price": 165,
        "face": "(¬‿¬)",
        "date": "Fri Feb 09 2018 20:11:48 GMT+1300 (New Zealand Daylight Time)"
    },
    {
        "id": "80072-sibhtmbzouf5com4rs9i442t9",
        "size": 21,
        "price": 696,
        "face": "(°ロ°)☝",
        "date": "Fri Feb 02 2018 05:51:38 GMT+1300 (New Zealand Daylight Time)"
    },
    {
        "id": "95910-6t3kn5r1eufc5e33w89dl323xr",
        "size": 27,
        "price": 571,
        "face": "(´・ω・)っ",
        "date": "Sat Jan 27 2018 18:04:44 GMT+1300 (New Zealand Daylight Time)"
    },
    {
        "id": "61722-6ypncbo7mow96d9wqknjyvi",
        "size": 19,
        "price": 817,
        "face": "(ó ì_í)",
        "date": "Mon Jan 29 2018 10:22:49 GMT+1300 (New Zealand Daylight Time)"
    },
    {
        "id": "25701-wtzctxq2zy4br65tnn9epnwmi",
        "size": 39,
        "price": 91,
        "face": "(ʘᗩʘ')",
        "date": "Wed Feb 07 2018 10:15:13 GMT+1300 (New Zealand Daylight Time)"
    },
    {
        "id": "19728-ax19dx8kg5mh5hnaoj4hadcxr",
        "size": 14,
        "price": 226,
        "face": "(ʘ‿ʘ)",
        "date": "Thu Feb 01 2018 08:04:25 GMT+1300 (New Zealand Daylight Time)"
    },
    {
        "id": "36852-hp7bnqd8l1l13ttgei0r1wcdi",
        "size": 25,
        "price": 863,
        "face": "(̿▀̿ ̿Ĺ̯̿̿▀̿ ̿)̄",
        "date": "Wed Jan 31 2018 06:22:22 GMT+1300 (New Zealand Daylight Time)"
    },
    {
        "id": "40040-ol59t5lhojo5edjvqumjcerk9",
        "size": 38,
        "price": 510,
        "face": "(͡° ͜ʖ ͡°)",
        "date": "Thu Feb 01 2018 06:13:28 GMT+1300 (New Zealand Daylight Time)"
    },
    {
        "id": "50197-uoc6flawia4n5dp7wupz7u8fr",
        "size": 16,
        "price": 761,
        "face": "ᕦ( ͡° ͜ʖ ͡°)ᕤ",
        "date": "Sun Jan 28 2018 11:51:09 GMT+1300 (New Zealand Daylight Time)"
    },
    {
        "id": "86631-eoh96vszjt8g4w6ey6sa9vn29",
        "size": 24,
        "price": 331,
        "face": "(ಠ_ಠ)",
        "date": "Sat Feb 03 2018 17:42:15 GMT+1300 (New Zealand Daylight Time)"
    },
    {
        "id": "18134-3e8i5ugpjj2o4gyxln664xi529",
        "size": 28,
        "price": 256,
        "face": "(ಠ‿ಠ)",
        "date": "Mon Feb 05 2018 01:32:40 GMT+1300 (New Zealand Daylight Time)"
    },
    {
        "id": "55802-acpu8dang6x7ju4eoeqshh0k9",
        "size": 34,
        "price": 574,
        "face": "(ಠ⌣ಠ)",
        "date": "Mon Feb 05 2018 05:39:21 GMT+1300 (New Zealand Daylight Time)"
    },
    {
        "id": "74929-hirg28q0c5c0x4horue17zaor",
        "size": 12,
        "price": 455,
        "face": "(ಥ_ಥ)",
        "date": "Tue Feb 06 2018 05:31:44 GMT+1300 (New Zealand Daylight Time)"
    },
    {
        "id": "56312-klc0pg6u0r01c7kgpd9fqolxr",
        "size": 19,
        "price": 192,
        "face": "(ಥ﹏ಥ)",
        "date": "Sun Feb 04 2018 07:56:58 GMT+1300 (New Zealand Daylight Time)"
    },
    {
        "id": "87201-vnpf8jitrgdrjis267sqbyb9",
        "size": 33,
        "price": 742,
        "face": "(ง ͠° ͟ل͜ ͡°)ง",
        "date": "Wed Feb 07 2018 13:38:17 GMT+1300 (New Zealand Daylight Time)"
    },
    {
        "id": "76773-ptfr1d2jimtk2vmamz8lzyqfr",
        "size": 36,
        "price": 331,
        "face": "(ง ͡ʘ ͜ʖ ͡ʘ)ง",
        "date": "Tue Feb 06 2018 20:03:27 GMT+1300 (New Zealand Daylight Time)"
    },
    {
        "id": "9936-s1h96qq8iap1ypbkw6l34ygb9",
        "size": 37,
        "price": 893,
        "face": "(ง •̀_•́)ง",
        "date": "Mon Jan 29 2018 15:43:00 GMT+1300 (New Zealand Daylight Time)"
    },
    {
        "id": "66640-s4cy74w18lbph2dh5ccsdcxr",
        "size": 37,
        "price": 390,
        "face": "(ง'̀-'́)ง",
        "date": "Wed Jan 31 2018 14:56:49 GMT+1300 (New Zealand Daylight Time)"
    },
    {
        "id": "83582-rdvp8eikjprsaov5the7gy14i",
        "size": 23,
        "price": 454,
        "face": "(ง°ل͜°)ง",
        "date": "Thu Feb 08 2018 08:26:32 GMT+1300 (New Zealand Daylight Time)"
    },
    {
        "id": "9597-56ju60yk08pst4uxxfym9jatt9",
        "size": 34,
        "price": 220,
        "face": "(ง⌐□ل͜□)ง",
        "date": "Sun Jan 28 2018 11:41:55 GMT+1300 (New Zealand Daylight Time)"
    },
    {
        "id": "86774-15mmvhzhtvfp7pte47voenrk9",
        "size": 38,
        "price": 822,
        "face": "(ღ˘⌣˘ღ)",
        "date": "Sat Feb 03 2018 19:17:14 GMT+1300 (New Zealand Daylight Time)"
    },
    {
        "id": "70207-98oibe7usr79fmpr1s3ehlg14i",
        "size": 19,
        "price": 421,
        "face": "(ᵔᴥᵔ)",
        "date": "Sat Feb 10 2018 21:55:39 GMT+1300 (New Zealand Daylight Time)"
    },
    {
        "id": "18500-qhr3j6ubkevwjl5el61935wmi",
        "size": 15,
        "price": 91,
        "face": "(•ω•)",
        "date": "Wed Jan 31 2018 13:52:30 GMT+1300 (New Zealand Daylight Time)"
    },
    {
        "id": "76593-zop0vbg310eeis4eggf5yiudi",
        "size": 38,
        "price": 328,
        "face": "(•◡•)/",
        "date": "Sun Jan 28 2018 21:22:00 GMT+1300 (New Zealand Daylight Time)"
    },
    {
        "id": "37622-2oagdixqdw3mcf20wudlwyiudi",
        "size": 35,
        "price": 149,
        "face": "(⊙ω⊙)",
        "date": "Sat Feb 10 2018 17:23:46 GMT+1300 (New Zealand Daylight Time)"
    }
];  