import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import when from "when";
import { currencyFormat, getCustomisedRelativeDate } from 'src/utils/app-utils';

describe("currencyFormat test", () => {

    it("should always return the fixed 2 decimal currency number with $ symbol", () => {

        expect(currencyFormat("2665")).toEqual("$2,665.00");
        expect(currencyFormat("102665")).toEqual("$102,665.00");
        expect(currencyFormat("10")).toEqual("$10.00");
        expect(currencyFormat("10.00")).toEqual("$10.00");
        expect(currencyFormat("50.0100")).toEqual("$50.01");
        expect(currencyFormat("52")).toEqual("$52.00");
        expect(currencyFormat("52.250025")).toEqual("$52.25");

    });

    describe('getCustomisedRelativeDate', () => {
        // const RealDate = Date
        var currentDate = new Date();
        beforeEach(()=> {
            currentDate = new Date();
        })

        //May not work because test execution takes a second atleast;
        // it("should always return the date in relative format for like just now", () => {
        //     //just now;
        //     currentDate.setMilliseconds(currentDate.getMilliseconds() - 10)
        //     expect(getCustomisedRelativeDate(currentDate.toString())).toContain("just now");
        // });

        it("should always return the date in relative format for like seconds ago", () => {
            //just now;
            currentDate.setSeconds(currentDate.getSeconds() - 10)
            expect(getCustomisedRelativeDate(currentDate.toString())).toContain("seconds ago");
        });

        it("should always return the date in relative format for like minutes ago", () => {
            currentDate.setMinutes(currentDate.getMinutes()  - 3)
            expect(getCustomisedRelativeDate(currentDate.toString())).toEqual("3 minutes ago");
            
        });

        it("should always return the date in relative format for like hours ago", () => {
            currentDate.setHours(currentDate.getHours()  - 3)
            expect(getCustomisedRelativeDate(currentDate.toString())).toEqual("3 hours ago");
            
        });

        it("should always return the date in relative format for like days ago", () => {
            currentDate.setDate(currentDate.getDate() - 3)
            expect(getCustomisedRelativeDate(currentDate.toString())).toEqual("3 days ago");
            
        });

        it("should always return the date in relative format for like days ago", () => {
            currentDate.setDate(currentDate.getDate() - 7)
            expect(getCustomisedRelativeDate(currentDate.toString())).toEqual("7 days ago");
            
        });
        
        it("should always return the date in date time format for more than a week time", () => {
            currentDate.setDate(currentDate.getDate() - 8)
            expect(getCustomisedRelativeDate(currentDate.toString())).toEqual(currentDate.toLocaleDateString());
        });
    })

   
});