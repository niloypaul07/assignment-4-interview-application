1. What is the difference between getElementById, getElementsByClassName, and querySelector / querySelectorAll?

Answer: getElementById:it targeted the id .its unique in HTML document.
        etElementsByClassName: it takes group of element for same style and fuction.
        querySelector / querySelectorAll: querySelector returns the first element. querySelectorAll selects CSS Selectors (ID, Class, Tag).

2. How do you create and insert a new element into the DOM?

Answer: For create we use document.createElement() and for insert we use appendChild().

3. What is Event Bubbling? And how does it work?

Answer: When we click an element, the click take bottom to up that child element to all of its parent elements.

4. What is Event Delegation in JavaScript? Why is it useful?

Answer: Event Delegation is a way when we  attach one event listener to a parent element to manage all of its children.

5. What is the difference between preventDefault() and stopPropagation() methods?

Answer: preventDefault() stops the browser default action and stopPropagation() stop the event from bubbling up.