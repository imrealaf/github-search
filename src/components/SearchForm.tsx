/**
 *  SearchForm
 *
 *  @type Component
 *  @desc handles the input validation and form submission
 */

import React, { useEffect, useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { InputGroup, Form, Button } from "react-bootstrap";

import { queryIsInvalid } from "../utils";

// SearchForm props
interface SearchFormProps {
  submit: any;
  reset: any;
  items: any[];
  query?: string | null;
}

const SearchForm: React.FC<SearchFormProps> = ({
  submit,
  query,
  reset,
  items
}) => {
  /*
   *  Create input/error state
   */
  const [value, setValue] = useState(query ? query : "");
  const [error, setError] = useState("");

  /*
   *  Input element reference
   */
  const inputRef = useRef() as any;

  /*
   *  Run when input value changes... do some error checking
   */
  useEffect(() => {
    let errorString = "";
    if (value.length && queryIsInvalid(value)) {
      errorString = "Only alpha-numeric characters and dashes are allowed";
    }
    setError(errorString);
  }, [value]);

  /*
   *  On change handler
   */
  const onChangeHandler = (e: React.FormEvent) => {
    const target = e.target as HTMLFormElement;
    setValue(target.value);
  };

  /*
   *  On submit handler
   */
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // If no error, submit search
    if (!error && value.length) {
      submit(value);
    }
  };

  /*
   *  On reset handler
   */
  const onReset = (e: React.FormEvent) => {
    reset();
    setValue("");
    inputRef.current.value = "";
  };

  /*
   *  Render
   */
  return (
    <Form onSubmit={onSubmit} role="search">
      {/* Field label */}
      <Form.Label htmlFor="search-input" className="sr-only">
        Search for user or company
      </Form.Label>

      <InputGroup className="mb-2">
        {/* Search input field */}
        <Form.Control
          ref={inputRef}
          id="search-input"
          name="query"
          type="search"
          size="lg"
          placeholder="Type user or company name.."
          aria-label="Search for user or company"
          defaultValue={value}
          onChange={onChangeHandler}
          isInvalid={error ? true : false}
        />

        {/* Submit button */}
        <InputGroup.Append>
          <Button
            type="submit"
            variant="outline-primary"
            disabled={error || !value.length ? true : false}
          >
            <FontAwesomeIcon icon={["fas", "search"]} /> Search
          </Button>
        </InputGroup.Append>
      </InputGroup>

      {/* Error message */}
      {error ? <Form.Text className="text-danger">{error}</Form.Text> : null}

      {/* Reset search button */}
      {items.length ? (
        <div className="text-right">
          <Button
            className="text-dark"
            onClick={onReset}
            variant="link"
            size="sm"
          >
            <strong>Reset search</strong>
          </Button>
        </div>
      ) : null}
    </Form>
  );
};

export default SearchForm;
