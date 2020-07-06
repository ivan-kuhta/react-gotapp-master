import React from 'react';
import RandomChar from './randomChar';
import {shallow} from 'enzyme'

describe('Testing <RandomChar />', () => {
    const char = shallow(<RandomChar/>);
    describe("Testing snap & state", () => {
        it('RandomChar have rendered correctly', () => {
            expect(char).toMatchSnapshot();
        });
        
        it('RendomChar state "char" is empty object', ()=>{
            expect(char.state().char).toBeObject();
        })
    
        it('RendomChar state "loading" is true', ()=>{
            expect(char.state().loading).toBeTruthy();
        })
    
        it('RendomChar state "error" is false', ()=>{
            expect(char.state().error).toBeFalsy();
        })
    });
    describe("Handlers tests", () => {
        it('testing onCharLoaded', ()=>{
            char.instance().onCharLoaded();
            expect(char.state().loading).toBeFalsy();
        })
        it('testing onError', ()=>{
            char.instance().onError();
            expect(char.state().error).toBeTruthy();
            expect(char.state().loading).toBeFalsy();
        })
        it('testing updateChar', ()=>{
            char.instance().updateChar();
            expect(char.state().loading).toBeFalsy();
        })
    })
})
