import express from "express";
import { IUserPublic } from "./types/Iuser";

declare global {
  namespace Express {
    interface Locals {
      user: null | IUserPublic;
    }
  }
}
