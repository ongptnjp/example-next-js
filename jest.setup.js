import { configure } from "enzyme";
import "@testing-library/jest-dom";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";

configure({ adapter: new Adapter() });