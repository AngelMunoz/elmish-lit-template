import { Union, Record } from "./.fable/fable-library.3.2.11/Types.js";
import { union_type, record_type, string_type, int32_type } from "./.fable/fable-library.3.2.11/Reflection.js";
import { html } from "./.fable/Elmish.Lit.1.0.0-beta-001/Lit.fs.js";
import { ProgramModule_mkSimple, ProgramModule_run } from "./.fable/Fable.Elmish.3.1.0/program.fs.js";
import { withLit } from "./.fable/Elmish.Lit.1.0.0-beta-001/Elmish.Lit.fs.js";

export class State extends Record {
    constructor(counter, name) {
        super();
        this.counter = (counter | 0);
        this.name = name;
    }
}

export function State$reflection() {
    return record_type("Main.State", [], State, () => [["counter", int32_type], ["name", string_type]]);
}

export class Msg extends Union {
    constructor(tag, ...fields) {
        super();
        this.tag = (tag | 0);
        this.fields = fields;
    }
    cases() {
        return ["Increment", "Decrement", "Reset"];
    }
}

export function Msg$reflection() {
    return union_type("Main.Msg", [], Msg, () => [[], [], []]);
}

function init(_arg1) {
    return new State(0, "World");
}

function update(msg, state) {
    switch (msg.tag) {
        case 1: {
            return new State(state.counter - 1, state.name);
        }
        case 2: {
            return init(state);
        }
        default: {
            return new State(state.counter + 1, state.name);
        }
    }
}

function counter(props) {
    return html({
        str: "\r\n        \u003cbutton @click={0}\u003e-\u003c/button\u003e\r\n        \u003cbutton @click={1}\u003eReset\u003c/button\u003e\r\n        \u003cbutton @click={2}\u003e+\u003c/button\u003e\r\n        \u003cdiv\u003e{3}\u003c/div\u003e\r\n\r\n    ",
        args: [(_arg1) => {
            props.decrement();
        }, (_arg2) => {
            props.reset();
        }, (_arg3) => {
            props.increment();
        }, props.counter],
    });
}

export function view(state, dispatch) {
    const counterEl = counter({
        counter: state.counter,
        decrement: () => {
            dispatch(new Msg(1));
        },
        increment: () => {
            dispatch(new Msg(0));
        },
        reset: () => {
            dispatch(new Msg(2));
        },
    });
    return html({
        str: "\r\n        \u003cdiv\u003eHello {0}!\u003c/div\u003e\r\n        {1}\r\n    ",
        args: [state.name, counterEl],
    });
}

ProgramModule_run(withLit("fable-lit", ProgramModule_mkSimple(init, (msg, state) => update(msg, state), (state_1, dispatch) => view(state_1, dispatch))));

