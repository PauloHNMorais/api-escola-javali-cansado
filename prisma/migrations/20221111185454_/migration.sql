-- CreateTable
CREATE TABLE "Course" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "CourseSubject" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "courseId" TEXT NOT NULL,
    "subjectId" TEXT NOT NULL,
    CONSTRAINT "CourseSubject_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "CourseSubject_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Member" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,
    "memberType" INTEGER NOT NULL,
    CONSTRAINT "Member_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Member_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Message" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "priority" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "courseSubjectId" TEXT NOT NULL,
    "memberCreatedId" TEXT NOT NULL,
    CONSTRAINT "Message_memberCreatedId_fkey" FOREIGN KEY ("memberCreatedId") REFERENCES "Member" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Message_courseSubjectId_fkey" FOREIGN KEY ("courseSubjectId") REFERENCES "CourseSubject" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Subject" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "imageURL" TEXT,
    "ownerMemberId" TEXT NOT NULL,
    CONSTRAINT "Subject_ownerMemberId_fkey" FOREIGN KEY ("ownerMemberId") REFERENCES "Member" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "SubjectItem" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "startDate" DATETIME,
    "endDate" DATETIME,
    "itemType" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "subtitle" TEXT,
    "description" TEXT,
    "memberCreatedId" TEXT NOT NULL,
    "parentSubjectItemId" TEXT,
    "courseSubjectId" TEXT NOT NULL,
    "url" TEXT,
    CONSTRAINT "SubjectItem_courseSubjectId_fkey" FOREIGN KEY ("courseSubjectId") REFERENCES "CourseSubject" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "SubjectItem_memberCreatedId_fkey" FOREIGN KEY ("memberCreatedId") REFERENCES "Member" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "SubjectItem_parentSubjectItemId_fkey" FOREIGN KEY ("parentSubjectItemId") REFERENCES "SubjectItem" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "CourseSubject_courseId_subjectId_key" ON "CourseSubject"("courseId", "subjectId");

-- CreateIndex
CREATE UNIQUE INDEX "Member_userId_courseId_key" ON "Member"("userId", "courseId");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
