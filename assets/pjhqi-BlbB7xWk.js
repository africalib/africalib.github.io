const e=`
@mixin flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}

.alpha {
  @include flex-center;
}

.beta {
  @include flex-center;
}
`;export{e as default};
