CREATE TABLE HOLIDAY (
   ID BIGINT GENERATED BY DEFAULT AS IDENTITY,
   DESTINATION CHARACTER VARYING(255),
   NAME CHARACTER VARYING(255),
   "TYPE" CHARACTER VARYING(255),
    AGENCY_ID BIGINT,

   CONSTRAINT HOLIDAY_PK PRIMARY KEY (ID)
);