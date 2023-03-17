import React from 'react';

// We use a trick here to prevent all of the checkboxes to rerender every time a value changes
// Normally all children of the AddFilmForm component would be rerendered if the state in that component changes..
// In order to prevent that we ensure that the hundreds of checkboxes are wrapped inside a React.memo call which
// ensures that the AdditionalEntitiesInput only runs if one of the props has changed, otherwise the old return value
// is returned. This process is called memoization, hence React.memo.
// React.memo only works properly if the props don't change every time (e.g functions and objects which are props)
// have the same reference, this is why we only pass primitives as props AND we used useCallback on handeInputChange in
// the parent component.

// You can try to see what happens if you remove React.memo and export the function inside directly. Watch the console.log statement
// in both situations when you click one of the checkboxes.

// Please note that you DO NOT NEED THIS in 90% of cases!!!!
// I have used memo here because we have hundreds of checkboxes which rerender causing a slowdown on the page,
// if you don't notice a slowdown do not optimize your code because optimizations might be slower than the actual code!
export const AdditionalEntitiesInput = React.memo(
  function AdditionalEntitiesInput({
    id,
    name,
    label,
    isChecked,
    onInputChange,
  }) {
    console.log('render');
    return (
      <label>
        <input
          type="checkbox"
          name={name}
          onChange={onInputChange}
          value={id}
          checked={isChecked}
        />
        {label}
      </label>
    );
  }
);
