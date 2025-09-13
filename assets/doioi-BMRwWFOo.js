const t=`
.parent {
    color: green;

    .child {
        text-align: left;

        > ul {
            list-style: none;
            
                > li {
                    font-size: 12px;
                }
        }
    }
}
`;export{t as default};
