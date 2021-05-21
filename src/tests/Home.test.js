import { render, screen, waitFor } from '@testing-library/react';
import React, { Component } from "react";
import { create, act } from "react-test-renderer"

import "./mock-server";

import {Cat, Home} from '../home/Home';

test("renders an 'Cat 5 : 6 votes' component", () => {
 render(<Cat id={5} pictureUrl='fake_url' nbVotes={6}/>);
 const headingElement = screen.getByText("Cat 5 : 6 votes");
 expect(headingElement).toBeInTheDocument();
});

const wait = async () => new Promise((resolve) => setTimeout(resolve, 0))

test("renders an Home component which does api calls", async () => {
 const {root} = create(<Home/>);
 console.log(root)

 await act(async() => {
    await wait()
  })
 await waitFor(()=>{
     expect(root.findByProps({ id: 1, pictureUrl: "fake_url1", nbVotes:5 })).toBeTruthy();
     expect(root.findByProps( { id: 2, pictureUrl: "fake_url2", nbVotes:6 })).toBeTruthy();
     expect(root.findByProps( { id: 3, pictureUrl: "fake_url3", nbVotes:8 })).toBeTruthy();
     expect( root.findByProps({ id: 4, pictureUrl: "fake_url4", nbVotes:52 })).toBeTruthy();
 }) });
