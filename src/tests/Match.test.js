import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import React, { Component } from "react";
import "./mock-server";
import { act } from "react-test-renderer"

import {Cat, Match} from '../match/Match';

test("renders a Cat componenet", ()=>{
    const cat = render(<Cat id={5} pictureUrl='fake_url' isVoted={true} onChange={null}/>);
    const headingElement = screen.getByText("Cat 5");
    expect(headingElement).toBeInTheDocument();
    const cat_radio = cat.getByLabelText("Cat 5");
    expect(cat_radio).toBeChecked();
})

test("renders an Match component which does api calls", async () => {
 const match = render(<Match/>);
 await waitFor(()=>match)

 expect(await screen.findByText("Cat 1")).toBeInTheDocument();
 expect(await screen.findByText("Cat 2")).toBeInTheDocument();
 expect(match.getByLabelText("Cat 1")).toBeChecked();
 const cat2_radio = match.getByLabelText("Cat 2");
 expect(cat2_radio).not.toBeChecked();

 const res = await fireEvent.click(cat2_radio);

 expect(match.getByLabelText("Cat 2")).toBeChecked();
 expect(match.getByLabelText("Cat 1")).not.toBeChecked();
  });
